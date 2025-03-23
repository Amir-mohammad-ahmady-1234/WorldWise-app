# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




# Project Setup & Local Development

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: Latest LTS version)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install dependencies:

   ```sh
   npm install
   ```
   _or_
   ```sh
   yarn install
   ```

## Running the Project Locally

1. run json-server :

```sh
npm run server
```
_or_
```sh
yarn server
```


2. Start the Vite development server:

```sh
npm run dev
```
_or_
```sh
yarn dev
```

3. After running the command, you should see an output like this:

```sh
VITE vX.X.X  ready in Xms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the application running.

## Setting Up the Fake API

This project uses a local JSON file (`data/cities.json`) as a mock API. To serve this file as an API:

1. Install JSON Server (if not already installed):

   ```sh
   npm install -g json-server
   ```

2. Start the JSON Server:

   ```sh
   json-server --watch data/cities.json --port 3001
   ```

   This will start a local API server at:

   ```sh
   http://localhost:3001/cities
   ```

3. You can now make API requests:

   - Get all cities:
     ```sh
     curl http://localhost:3001/cities
     ```
   - Access it in the browser: [http://localhost:3001/cities](http://localhost:3001/cities)

## Build for Production

To create a production-ready build, run:

```sh
npm run build
```
_or_
```sh
yarn build
```

This will generate a `dist/` folder with optimized assets.

---

Now you're all set! 🚀 Happy coding!
