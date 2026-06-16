# Gestión Dinámica del Menú (Backend / CMS)

El menú de Bartolo Café actualmente es estático (los datos están en el código en `app/menu/page.tsx`). Para que el dueño pueda actualizar precios, agregar o quitar productos de forma autónoma sin tocar código, necesitamos implementar una arquitectura de datos dinámica.

Al ser una aplicación moderna en Next.js, tenemos varias opciones óptimas. A continuación presento las mejores alternativas ordenadas por nivel de recomendación para este caso de uso específico (una cafetería).

## Opciones Propuestas

### Opción 1: Google Sheets como Base de Datos (Recomendación Principal ⭐)
Consiste en conectar la página web a un archivo de Google Sheets privado. 
- **Cómo funciona para el dueño:** Abre Google Sheets en su celular o computadora, edita una celda (por ejemplo, cambia el precio del "Café Bartolo" de $7,500 a $8,000) y el sitio web se actualiza instantáneamente (o al recargar).
- **Ventajas:** Curva de aprendizaje cero (todo el mundo sabe usar Excel/Sheets). Es 100% gratis. Se puede gestionar desde el celular fácilmente.
- **Desventajas:** No es una base de datos "profesional", pero para un menú de restaurante es una de las soluciones más efectivas y populares del mercado actual.

### Opción 2: Headless CMS (Ej: Sanity.io o Contentful)
Consiste en utilizar un Gestor de Contenidos (CMS) moderno.
- **Cómo funciona para el dueño:** Inicia sesión en una plataforma web (ej. `bartolocafe.sanity.studio`), donde verá un panel de administración profesional con formularios para editar categorías, productos y precios.
- **Ventajas:** Extremadamente profesional, robusto y escalable. Interfaz a medida. Permite subir imágenes de los productos fácilmente si en el futuro se desea.
- **Desventajas:** El dueño tiene que aprender a usar una plataforma nueva. Requiere crear una cuenta en el servicio de terceros.

### Opción 3: Base de Datos + Panel de Administración Propio (Supabase / Firebase)
Consiste en programar desde cero una base de datos y una pantalla oculta en la web (ej: `bartolo.com/admin`).
- **Cómo funciona para el dueño:** Inicia sesión con usuario y contraseña en la misma página web y edita los precios mediante una interfaz que nosotros programemos.
- **Ventajas:** Control total y absoluto sobre el diseño y la funcionalidad. Todo queda dentro del mismo proyecto.
- **Desventajas:** Toma mucho más tiempo de desarrollo (hay que programar el login, la seguridad, las tablas, los formularios de edición, etc.).

## User Review Required

> [!IMPORTANT]
> **Necesito que elijas una de las opciones anteriores para proceder con el desarrollo.**
> 
> Mi recomendación para pequeños y medianos comercios suele ser la **Opción 1 (Google Sheets)** por la inmediatez y facilidad que le da al dueño, o la **Opción 2 (Sanity.io)** si buscas una solución tecnológica más robusta y "premium" a nivel arquitectura.

## Open Questions

1. ¿Qué opción prefieres que implementemos?
2. Si eliges la Opción 1, ¿te gustaría que armemos el código para que lea de un Google Sheet público o prefieres que configuremos credenciales de API para un Sheet privado? (Un Sheet público de solo lectura es la vía más rápida y común).

## Proposed Changes

Una vez que decidas, el plan de acción general será:

### Componentes de UI
#### [MODIFY] `app/menu/page.tsx`
- Refactorizar para que en lugar de usar el `const menuData` hardcodeado, obtenga los datos desde el servidor en tiempo real o mediante *Incremental Static Regeneration* (ISR) para que la página cargue instantáneamente pero se actualice de fondo.

#### [MODIFY] `app/page.tsx`
- Actualizar la sección de "Carta Seleccionada" para que obtenga los 3 productos destacados directamente de la nueva base de datos.

### Lógica de Datos
#### [NEW] `lib/data.ts` o equivalente
- Crear las funciones necesarias para conectarse al servicio elegido (API de Google Sheets, Sanity, o Supabase) y extraer/formatear el menú de forma segura.

## Verification Plan

### Manual Verification
- Simularemos ser el cliente: Cambiaremos un precio en el panel/planilla elegida.
- Refrescaremos la web y verificaremos que el precio nuevo aparece correctamente tanto en la página de inicio (si es un producto destacado) como en la carta completa.
