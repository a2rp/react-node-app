# React + Node API Demo

A small full-stack starter with a React client and an Express server. The client calls the server's JSON endpoint and shows whether the API is reachable.

## Project structure

- `node-project/server` — Express API on port `3001` by default
- `node-project/client/client` — Vite + React client on port `5173`

## Run locally

Use Node.js 18 or newer. Open two terminals from the repository root.

Start the API:

```bash
cd node-project
npm install
npm start
```

Start the client in development mode:

```bash
cd node-project/client/client
npm install
npm run dev
```

The Vite development server proxies `/api` requests to `http://localhost:3001`. Visit `http://localhost:5173` to see the connection status.

## API

`GET /api` returns:

```json
{
  "message": "Hello from Express",
  "service": "react-node-app",
  "status": "ok"
}
```

Set the server port with the `PORT` environment variable. Build the client from `node-project/client/client` with `npm run build`. The development proxy is local-only; configure a production web server to forward `/api` requests to Express.
