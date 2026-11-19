# Todo List Frontend

Frontend de una aplicación de tareas. Permite crear una cuenta, iniciar sesión y administrar tareas mediante una API REST.

## Demo
- Aplicación: [Para abrir Todo App](https://todo-list-frontend-practica.vercel.app/)
- API: [Para verificar el estado](https://todo-list-backend-practica.onrender.com/health)

 La aplicación usa una API Express alojada en Render y una base de datos PostgreSQL alojada en Neon.

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

Para probar la demo publicada, solo necesitas un navegador.

Para ejecutar el frontend localmente, necesitas Node.js y npm, además del backend ejecutándose. Consulta el README del backend para configurarlo.

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
