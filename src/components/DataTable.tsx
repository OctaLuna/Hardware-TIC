import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Download, Filter } from 'lucide-react';

export interface DataTableColumn<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
  render?: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
  csvValue?: (row: T) => string | number;
}

export interface DataTableFilter<T> {
  key: string;
  label: string;
  options: string[];
  getValue: (row: T) => string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  filters?: DataTableFilter<T>[];
  exportFilename?: string;
  emptyMessage?: string;
  rowKey?: (row: T, index: number) => string;
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchPlaceholder = 'Buscar en la tabla...',
  searchKeys,
  filters = [],
  exportFilename,
  emptyMessage = 'No se encontraron registros que coincidan con los filtros actuales.',
  rowKey,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (col: DataTableColumn<T>) => {
    if (!col.sortable) return;
    const key = String(col.key);
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) return { key, direction: 'asc' };
      if (prev.direction === 'asc') return { key, direction: 'desc' };
      return null;
    });
  };

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const keysToSearch = searchKeys || (Object.keys(row) as (keyof T)[]);
        const matchesSearch = keysToSearch.some((k) => {
          const val = row[k];
          return val !== undefined && val !== null && String(val).toLowerCase().includes(q);
        });
        if (!matchesSearch) return false;
      }

      // Dropdown filters
      for (const filter of filters) {
        const selected = activeFilters[filter.key];
        if (selected && selected !== 'Todos') {
          if (filter.getValue(row) !== selected) return false;
        }
      }

      return true;
    });
  }, [data, searchQuery, activeFilters, filters, searchKeys]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    const col = columns.find((c) => String(c.key) === sortConfig.key);
    if (!col) return filteredData;

    return [...filteredData].sort((a, b) => {
      const valA = col.sortValue ? col.sortValue(a) : a[col.key as keyof T];
      const valB = col.sortValue ? col.sortValue(b) : b[col.key as keyof T];

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
      }

      const strA = String(valA ?? '').toLowerCase();
      const strB = String(valB ?? '').toLowerCase();
      if (strA < strB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (strA > strB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig, columns]);

  const handleExportCsv = () => {
    if (!exportFilename) return;
    const headers = columns.map((c) => `"${c.header.replace(/"/g, '""')}"`).join(',');
    const rowsCsv = sortedData.map((row) =>
      columns
        .map((col) => {
          const raw = col.csvValue
            ? col.csvValue(row)
            : row[col.key as keyof T] ?? '';
          return `"${String(raw).replace(/"/g, '""')}"`;
        })
        .join(',')
    );
    const csvContent = [headers, ...rowsCsv].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${exportFilename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar: Search, Filters & Export CSV */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-4 rounded-2xl border-2 border-stone-300 shadow-sm">
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF5DC]/50 border border-stone-300 text-sm text-surface placeholder-stone-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Dropdown Filters */}
          {filters.map((filter) => (
            <div key={filter.key} className="flex items-center gap-2">
              <label className="text-xs font-mono font-bold text-stone-600 uppercase whitespace-nowrap flex items-center gap-1">
                <Filter size={12} className="text-primary" />
                {filter.label}:
              </label>
              <select
                value={activeFilters[filter.key] || 'Todos'}
                onChange={(e) =>
                  setActiveFilters((prev) => ({
                    ...prev,
                    [filter.key]: e.target.value,
                  }))
                }
                className="px-3 py-2.5 rounded-xl bg-[#FAF5DC]/50 border border-stone-300 text-xs sm:text-sm font-medium text-surface focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="Todos">Todos</option>
                {filter.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-3">
          <span className="text-xs font-mono text-stone-600 tabular-nums whitespace-nowrap">
            {sortedData.length} de {data.length} registros
          </span>
          {exportFilename && (
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111111] text-white hover:bg-primary text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download size={14} />
              <span>Exportar CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-2xl border-2 border-[#0A0A0A] shadow-hard bg-white">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className="bg-[#111111] text-white">
              {columns.map((col) => {
                const keyStr = String(col.key);
                const isSorted = sortConfig?.key === keyStr;
                return (
                  <th
                    key={keyStr}
                    onClick={() => handleSort(col)}
                    className={`px-4 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-gray-200 border-b border-neutral-800 whitespace-nowrap ${
                      col.sortable ? 'cursor-pointer hover:text-primary select-none' : ''
                    } ${
                      col.align === 'right'
                        ? 'text-right'
                        : col.align === 'center'
                        ? 'text-center'
                        : 'text-left'
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="text-primary">
                          {isSorted ? (
                            sortConfig.direction === 'asc' ? (
                              <ArrowUp size={13} />
                            ) : (
                              <ArrowDown size={13} />
                            )
                          ) : (
                            <ArrowUpDown size={13} className="opacity-50" />
                          )}
                        </span>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 font-sans text-sm">
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-foreground-muted"
                >
                  <p className="font-medium mb-2">{emptyMessage}</p>
                  {(searchQuery || Object.values(activeFilters).some((v) => v && v !== 'Todos')) && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setActiveFilters({});
                      }}
                      className="text-xs font-mono font-bold text-primary hover:underline cursor-pointer"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              sortedData.map((row, idx) => (
                <tr
                  key={rowKey ? rowKey(row, idx) : idx}
                  className={`transition-colors ${
                    idx % 2 === 0 ? 'bg-[#FDFBF7]' : 'bg-white'
                  } hover:bg-primary/5`}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={`px-4 py-3.5 align-middle ${
                        col.align === 'right'
                          ? 'text-right'
                          : col.align === 'center'
                          ? 'text-center'
                          : 'text-left'
                      }`}
                    >
                      {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
