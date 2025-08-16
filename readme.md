# Proyecto: Backend Node.js + TypeScript – Microservicio /optimizar

Cristhian Augusto Romero Mesías

## Descripción
Este proyecto implementa un microservicio en Node.js con TypeScript y MongoDB que resuelve el problema de la mochila 0/1 (Knapsack) para optimizar la selección de proyectos en base a su ganancia y costo. Incluye un frontend en React + Vite que permite interactuar con el servicio, visualizar resultados y consultar ejecuciones almacenadas en MongoDB.

## Características
- API RESTful con Express y TypeScript.
- Algoritmo de optimización Knapsack 0/1.
- Persistencia en MongoDB de las ejecuciones realizadas.
- Documentación de API con Swagger.
- Frontend en React + Vite con TailwindCSS.
- Visualización de resultados en tablas y gráficos.
- Listado de ejecuciones recientes.
- Configuración Docker para backend y frontend.

## Requisitos previos
- Node.js >= 18
- MongoDB >= 5
- npm o yarn
- Docker (opcional para despliegue)

## Instalación y ejecución
### Backend
```bash
cd backend
npm install
npm run dev
```
El backend estará disponible en `http://localhost:3000`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
El frontend estará disponible en `http://localhost:5173`.

## Variables de entorno
Crear un archivo `.env` en `backend` con:
```
MONGODB_URI=mongodb://localhost:27017/knapsack
PORT=3000
```
En `frontend`:
```
VITE_API_BASE_URL=http://localhost:3000
```

## Uso
1. Abrir el frontend.
2. Ingresar la capacidad y la lista de proyectos (nombre, peso, ganancia).
3. Presionar **Calcular** para obtener la selección óptima.
4. Ver resultados y ejecuciones anteriores.

## Endpoints principales
- `POST /optimizar`: Realiza la optimización.
- `GET /runs`: Lista ejecuciones recientes.


## Docker Compose
```bash
docker compose up --build
```

### Opción B: Contenedores por separado
**Backend**
```bash
cd backend
docker build -t optimizar-backend .
# usar la red host para desarrollo local de frontend
docker run --name optimizar-backend \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/knapsack \
  -e PORT=3000 -p 3000:3000 optimizar-backend
```

Reemplazar `\` con ` para powershell

**Frontend**
```bash
cd frontend
# asegurarse de que VITE_API_BASE_URL apunte al backend
# en contenedor de nginx usamos el 80 interno
docker build -t optimizar-frontend .
docker run --name optimizar-frontend -p 5173:80 \
  -e VITE_API_BASE_URL=http://localhost:3000 \
  optimizar-frontend
```

Reemplazar `\` con ` para powershell

## Troubleshooting (Docker)
- **CORS / API URL**: si ves errores de red en el navegador, confirma que `VITE_API_BASE_URL` apunta a `http://localhost:3000` (cuando usas compose) y que el backend tiene `cors()` habilitado (ya lo tiene).
- **Mongo no arranca**: elimina el volumen y recrea: `docker compose down -v && docker compose up --build`.
- **Puertos ocupados**: cambia los mapeos `3000:3000` o `5173:80` por otros libres.

## Licencia
MIT
