# Todo List Frontend

Frontend de una aplicación de tareas. Permite crear una cuenta, iniciar sesión y administrar tareas mediante una API REST.

## Funcionalidades

- Registro e inicio de sesión.
- Listado de tareas del usuario autenticado.
- Creación, actualización y eliminación de tareas.
- Las peticiones protegidas incluyen un token JWT.

## Tecnologías

- React
- Vite
- JavaScript
- Fetch API

## Proyecto relacionado

El backend Express y PostgreSQL está en [todo API](https://github.com/renatoapc/todo-list-backend-practica).

## Requisitos

- Node.js y npm.
- El backend y PostgreSQL configurados y ejecutándose. Consulta el README del repositorio del backend.

## Ejecutar localmente

1. Clona este repositorio:

   ```bash
   git clone https://github.com/renatoapc/todo-list-frontend-practica.git
   ```

2. Entra a la carpeta e instala las dependencias:

   ```bash
   cd todo-list-frontend-practica
   npm install
   ```

3. Crea un archivo `.env.local` en la raíz del proyecto y agrega la URL local del backend:

   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Inicia el frontend:

   ```bash
   npm run dev
   ```

Mantén el backend ejecutándose mientras usas la aplicación. Vite mostrará en la terminal la dirección local del frontend.

`VITE_API_URL` es configuración pública del frontend; no agregues contraseñas ni claves privadas a variables con prefijo `VITE_`.

## Comprobaciones

```bash
npm test
npm run lint
npm run build
```
