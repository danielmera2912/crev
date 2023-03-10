# CREV

<p align="center">
  <img src="https://raw.githubusercontent.com/danielmera2912/crev_server/master/crev_logo.png" />
</p>

## Información

Esta página web llamada CREV (Creador de Eventos Deportivos), consiste en la creación de eventos deportivos, tras registrarte puedes crear un evento para una ciudad y fecha concreta, puedes elegir entre varios deportes, algunos son partidos individuales y otros son partidos de equipos (Ciervos Verdes vs Ballenas Azules), también puedes participar en otros eventos deportivos de diferentes usuarios y acceder a sus perfiles para contactar con ellos y hacer grandes amigos de tus proximidades para poder jugar al deporte que más te gusta.

## Despliegue

[Aquí para visitar la web](https://crev.netlify.app/)

## Servidor


AVISO IMPORTANTE: Si se instala el cliente localmente no funcionará debido a la política de CORS, ya que en el servidor permite solo de origen: "https://crev.netlify.app/", para solucionar eso se necesitaría instalar el servidor localmente y modificar en index.js la línea 19 para cambiar dicho enlace por la ruta local donde está desplegado el servidor "localhost:3001", además habría que cambiar todas las llamadas a al API cambiando el enlace "https://crev-server.onrender.com/api/v1/" por "http://127.0.0.1:3001/api/v1/".

[Aquí para visitar el repositorio del servidor](https://github.com/danielmera2912/crev_server)

[Aquí para visitar la api que usa la página web](https://crev-server.onrender.com/api/v1/partidos)

## Instalación

This template should help get you started developing with Vue 3 in Vite.

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
