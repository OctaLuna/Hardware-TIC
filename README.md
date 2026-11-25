# Tiradores Hardware — IA MediTech

Sitio y portal de gobernanza técnica del **Equipo de Hardware e Infraestructura de Tiradores** (IATECH Co. / IA MediTech).

## Rutas del sitio

La aplicación cuenta con 21 rutas navegables mediante el menú lateral, buscador incluido. La descripción actualizada de la estructura y el contenido está en [ESTRUCTURA_Y_CONTENIDO_WEB.md](./ESTRUCTURA_Y_CONTENIDO_WEB.md).

- **Inicio y fundamentos:** `/`, `/gestion-tecnologia`, `/ciencia-tecnologia-innovacion`, `/mision-vision`
- **Equipo:** `/organigrama`, `/posiciones`, `/mbti`, `/scrum`, `/objetivos`, `/contacto`
- **Procesos y datos:** `/idef0`, `/bpmn`, `/inventarios`, `/tableau`, `/weka`, `/monitoreo`, `/presupuesto`
- **Gestión y cierre:** `/servicios-externos`, `/contingencia`, `/conclusiones`, `/recomendaciones`
- **Ruta desconocida:** página 404 con acceso al inicio

## Desarrollo local

El proyecto usa Bun (`bun.lock`). Instala dependencias y ejecuta Vite:

```bash
bun install
bun run dev
```

Vite inicia en `http://localhost:3000`. Los comandos disponibles incluyen `bun run build`, `bun run preview` y `bun run lint` (TypeScript).

## Build y despliegue

El build de producción se genera en `dist/`. Los recursos de `public/`, incluidas las fotos de `public/team/`, se copian automáticamente a `dist/` y se sirven desde `/team/`.

Para habilitar un mapa real de PRTG, define `VITE_PRTG_MAP_URL` en el entorno de despliegue con la URL oficial accesible desde los visitantes. Si no está configurada, el mapa queda inactivo y se muestra el esquema de referencia.
