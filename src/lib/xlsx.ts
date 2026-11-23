const encoder = new TextEncoder();

function xmlEscape(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function columnName(index: number) {
  let name = '';
  let value = index + 1;
  while (value > 0) {
    const remainder = (value - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    value = Math.floor((value - 1) / 26);
  }
  return name;
}

function worksheet(rows: Array<Array<string | number | null>>) {
  const body = rows.map((row, rowIndex) => {
    const cells = row.map((value, columnIndex) => {
      if (value == null || value === '') return '';
      const ref = `${columnName(columnIndex)}${rowIndex + 1}`;
      return typeof value === 'number'
        ? `<c r="${ref}"><v>${value}</v></c>`
        : `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${xmlEscape(value)}</t></is></c>`;
    }).join('');
    return `<row r="${rowIndex + 1}">${cells}</row>`;
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${body}</sheetData></worksheet>`;
}

function crc32(bytes: Uint8Array) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function zipStore(files: Array<{ name: string; text: string }>) {
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;
  const u16 = (value: number) => { const bytes = new Uint8Array(2); new DataView(bytes.buffer).setUint16(0, value, true); return bytes; };
  const u32 = (value: number) => { const bytes = new Uint8Array(4); new DataView(bytes.buffer).setUint32(0, value >>> 0, true); return bytes; };
  const join = (parts: Uint8Array[]) => {
    const result = new Uint8Array(parts.reduce((total, part) => total + part.length, 0));
    let position = 0;
    for (const part of parts) { result.set(part, position); position += part.length; }
    return result;
  };

  for (const file of files) {
    const name = encoder.encode(file.name);
    const data = encoder.encode(file.text);
    const checksum = crc32(data);
    const local = join([u32(0x04034b50), u16(20), u16(0), u16(0), u16(0), u16(0), u32(checksum), u32(data.length), u32(data.length), u16(name.length), u16(0), name, data]);
    localParts.push(local);
    const central = join([u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(0), u16(0), u32(checksum), u32(data.length), u32(data.length), u16(name.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), name]);
    centralParts.push(central);
    offset += local.length;
  }
  const centralDirectory = join(centralParts);
  const end = join([u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length), u32(centralDirectory.length), u32(offset), u16(0)]);
  return new Blob([...localParts, centralDirectory, end], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

export interface WorkbookBudgetItem {
  concepto: string;
  tipo: string;
  cantidad: number;
  unitario: number | null;
  frecuencia: string;
  fuente: string;
}

export interface WorkbookBudgetScenario { name: string; monthly: number; firstYear: number; note: string }
export interface WorkbookBudgetTotals { capex: number; monthlyOpex: number; opexAnnual: number; firstYear: number }

export function buildBudgetWorkbook(items: WorkbookBudgetItem[], scenarios: WorkbookBudgetScenario[], totals: WorkbookBudgetTotals) {
  const budgetRows: Array<Array<string | number | null>> = [
    ['Concepto', 'Tipo', 'Cantidad', 'Costo unitario (Bs.)', 'Frecuencia', 'Subtotal conocido (Bs.)', 'Fuente / estado'],
    ...items.map((item) => [item.concepto, item.tipo, item.cantidad, item.unitario, item.frecuencia, item.unitario == null ? null : item.unitario * item.cantidad, item.fuente]),
    ['', '', '', '', '', '', ''],
    ['CAPEX conocido', '', '', '', '', totals.capex, 'Partidas con importe'],
    ['OPEX mensual calculado', '', '', '', '', totals.monthlyOpex, 'Mensualidades con importe'],
    ['OPEX anual calculado', '', '', '', '', totals.opexAnnual, 'OPEX mensual × 12'],
    ['Total del primer año', '', '', '', '', totals.firstYear, 'CAPEX conocido + OPEX anual'],
  ];
  const assumptions: Array<Array<string | number | null>> = [
    ['Supuesto o escenario', 'Valor / referencia'],
    ['Moneda', 'Bolivianos (Bs.)'],
    ['Precios', 'Referenciales; verificar vigencia y solicitar cotización formal.'],
    ['Partidas sin importe', 'Se excluyen de los totales hasta contar con cotización.'],
    ['Anualización OPEX', 'Los importes mensuales se multiplican por 12.'],
    ['CAPEX conocido', totals.capex],
    ['OPEX mensual calculado', totals.monthlyOpex],
    ['OPEX anual calculado', totals.opexAnnual],
    ['Total calculado del primer año', totals.firstYear],
    ['Escenario de referencia', 'Primer año (Bs.)'],
    ...scenarios.map((scenario) => [scenario.name, scenario.firstYear]),
    ...scenarios.map((scenario) => [`${scenario.name} · mensual`, scenario.monthly]),
    ...scenarios.map((scenario) => [`${scenario.name} · criterio`, scenario.note]),
  ];

  const files = [
    { name: '[Content_Types].xml', text: '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>' },
    { name: '_rels/.rels', text: '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>' },
    { name: 'xl/workbook.xml', text: '<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Presupuesto" sheetId="1" r:id="rId1"/><sheet name="Supuestos" sheetId="2" r:id="rId2"/></sheets><calcPr calcMode="auto"/></workbook>' },
    { name: 'xl/_rels/workbook.xml.rels', text: '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/></Relationships>' },
    { name: 'xl/worksheets/sheet1.xml', text: worksheet(budgetRows) },
    { name: 'xl/worksheets/sheet2.xml', text: worksheet(assumptions) },
  ];

  return zipStore(files);
}

export function downloadBudgetWorkbook(items: WorkbookBudgetItem[], scenarios: WorkbookBudgetScenario[], totals: WorkbookBudgetTotals) {
  const blob = buildBudgetWorkbook(items, scenarios, totals);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'presupuesto-tiradores.xlsx';
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
