# MichiCare · Sitio web (Frontend)

Sitio web de **MichiCare**, una tienda en línea de productos para gatos. Es la migración de mi sitio de la Entrega 1 (HTML, CSS y JavaScript) a una aplicación completa con Next.js que consume una API propia, con registro, inicio de sesión y rutas protegidas por rol. Es la **Entrega 3** de Desarrollo Web (2026-2).

## Despliegues

| Qué | Link |
|---|---|
| Sitio en producción (Vercel) | https://michi-care-frontend.vercel.app |
| API en producción (Render) | https://michicare-backend.onrender.com |
| Repositorio del frontend | https://github.com/ValenMoraR/MichiCare-Frontend |
| Repositorio del backend | https://github.com/ValenMoraR/MichiCare-Backend |

> La API está en el plan gratuito de Render: si lleva un rato sin uso, la primera carga del catálogo puede tardar cerca de un minuto.

## Tecnologías

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4

## Qué se puede hacer

- **Invitado:** ver el catálogo (con paginación y filtro por categoría), el detalle de cada producto y la página de cuidados. Si intenta usar el carrito o la lista de deseos, lo lleva a iniciar sesión.
- **Usuario:** carrito (con límite según el stock), lista de deseos, consultas a la tienda desde Contáctanos (sobre un producto o sobre su michi) y su historial en "Mis consultas".
- **Administrador:** panel `/admin` para crear, editar y borrar productos (con stock y confirmación antes de eliminar) y ver las consultas que reciben de los usuarios.

## Rutas

| Ruta | Acceso |
|---|---|
| `/`, `/catalogo`, `/catalogo/[id]`, `/cuidados` | Público |
| `/login`, `/registro` | Público (con sesión activa redirigen al inicio) |
| `/contacto` | Muestra el formulario a usuarios; pide iniciar sesión a invitados |
| `/carrito`, `/deseos`, `/cuenta` | Requieren sesión para agregar o ver datos |
| `/mis-consultas` | Solo usuarios con sesión |
| `/admin`, `/admin/consultas` | Solo rol admin (un usuario normal es redirigido al inicio) |
| Cualquier otra | Página 404 propia |

Ocultar un botón no protege una ruta: la protección real está en el backend (`401` sin token, `403` sin permiso). La del frontend es de experiencia de usuario.

## Organización del código

```
app/                          → rutas (page.tsx): solo componen
src/features/
├── common/                   → config.ts (URL de la API), http.ts (cliente HTTP) y componentes compartidos
├── auth/                     → domain · services · hooks (useAuth) · components (LoginForm, RegisterForm)
├── products/                 → domain · services · hooks · components (catálogo, tarjeta, detalle)
├── interactions/             → domain · services · hooks · components (formulario de contacto, mis consultas)
└── admin/                    → components del panel de administración
```

Ningún componente llama a `fetch` directamente: todo pasa por `services/`, y los componentes usan `hooks/`. El cliente HTTP (`http.ts`) agrega el header `Authorization: Bearer <token>` a cada petición y, si la API responde `401`, cierra la sesión y lleva a `/login`.

## Variables de entorno

| Variable | Para qué sirve |
|---|---|
| `NEXT_PUBLIC_API_HOST` | URL base de la API (sin barra al final) |

Para desarrollo local, crea `.env.local`:

```
NEXT_PUBLIC_API_HOST=http://localhost:3000
```

En Vercel se configura en *Settings → Environment Variables* con la URL de Render.

## Cómo correrlo en local

Primero deja corriendo el backend (ver el README del backend). Después:

```bash
npm install
npm run dev -- -p 3001      # http://localhost:3001
```

El puerto 3001 es el que el backend permite por defecto en su variable `FRONTEND_URL`. Para compilar como en producción: `npm run build` y `npm start`.

## Credenciales de prueba

Creadas por el seed del backend, **solo para el ambiente de esta entrega**:

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@michicare.com` | `Admin12345` |
| Usuario | `user@michicare.com` | `User12345` |


### Flujo completo de un login (visto desde el frontend)

1. El usuario llena `LoginForm`, que valida el formato antes de enviar y muestra los errores junto a cada campo.
2. El formulario llama a `login` del hook `useAuth`, que usa `auth.service.ts`, que a su vez usa el cliente `http.ts` para hacer `POST /api/auth/login` (sin token, porque todavía no hay sesión).
3. Si la API responde bien, `useAuth` guarda el token en `localStorage` y los datos públicos del usuario (nombre y rol), y actualiza el estado de la sesión. La barra de navegación cambia según ese estado: invitado ve "Ingresar", usuario ve su nombre y "Salir", y admin ve además "Administración".
4. Desde ahí, cada petición protegida pasa por `http.ts`, que agrega `Authorization: Bearer <token>`. El backend verifica el token y responde.
5. Al recargar la página, `useAuth` vuelve a leer el token guardado y consulta `GET /api/auth/me` para comprobar que sigue vigente; si el backend responde `401`, se cierra la sesión.

### ¿Dónde guardo el token y qué riesgo tiene?

Lo guardo en `localStorage`. Lo elegí porque es simple y hace que la sesión sobreviva al recargar la página. El riesgo es que cualquier script que se ejecute en mi página (un ataque XSS) podría leerlo y usarlo. Lo reduzco con que React escapa el contenido por defecto, con que no uso `dangerouslySetInnerHTML` y con que el token expira. Una opción más segura sería una cookie `httpOnly`, que JavaScript no puede leer, pero requiere más cambios en el backend y en el frontend.

### ¿En qué caso responde la API 401 y en cuál 403?

- **401**: la petición no trae token o este es inválido o venció. Ejemplo: borrar un producto sin iniciar sesión. El frontend responde cerrando la sesión y llevando a `/login`.
- **403**: el token es válido pero el rol no alcanza. Ejemplo: un usuario normal que intenta borrar un producto, algo que solo puede hacer el administrador.

### ¿Cómo se diferencia un admin de un usuario?

El formulario de login es el mismo para todos. La diferencia está en el campo `role` de la cuenta, que viene de la base de datos y viaja con el token. El frontend lo usa para decidir qué mostrar (por ejemplo, el panel `/admin`), y el backend lo usa para decidir qué permitir.

### Si usaste IA, ¿para qué la usaste y qué tuviste que corregir?

Usé un asistente de IA para estructurar los features, el cliente HTTP y la sesión. Tuve que corregir cosas como: el catálogo pedía los datos al servidor durante el build y fallaba, así que lo pasé a un hook que los pide desde el navegador; las imágenes se veían cortadas y ajusté los tamaños; el carrito permitía agregar más unidades que el stock; y cualquier visitante podía usar el carrito sin sesión, así que lo cambié para que lo lleve a iniciar sesión.

## Captura de la pestaña Network

Petición protegida (`GET /api/auth/me`) mostrando el header `Authorization`:

Falta subir la imagen!!

## Limitaciones conocidas

- El carrito y la lista de deseos se guardan en el navegador (`localStorage`), no en la base de datos, y se vacían al cerrar sesión. La compra todavía no está conectada a un sistema de pagos.
- Las imágenes de los productos son las que ya están en `public/images`: el administrador elige una de esa lista.
- El filtro del catálogo es solo por categoría.
- El token se guarda en `localStorage` (ver el riesgo explicado arriba).