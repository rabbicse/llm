# Frontend Installation Guide

## Install Vite with react
To install vite with react write the following command.
```bash
npm create vite@latest
```

The following output should appear:
```bash
Need to install the following packages:
  create-vite@6.2.0
Ok to proceed? (y)

? Project name: » vite-project
? Project name: » llm-chatbot

√ Project name: ... llm-chatbot
? Select a framework: » - Use arrow-keys. Return to submit.
    Vanilla
    Vue
>   React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Angular
    Others

√ Project name: ... llm-chatbot
√ Select a framework: » React
? Select a variant: » - Use arrow-keys. Return to submit.
>   TypeScript
    TypeScript + SWC
    JavaScript
    JavaScript + SWC
    React Router v7 ↗

√ Project name: ... llm-chatbot
√ Select a framework: » React
√ Select a variant: » TypeScript

Scaffolding project in D:\github\llm\frontend\llm-chatbot...

Done. Now run:

  cd llm-chatbot
  npm install
  npm run dev
```

Then run the following commands
```bash
cd llm-chatbot
npm install
npm run dev
```

## Install tailwindcss
Install Tailwind css with the following command. For more details go to `https://tailwindcss.com/docs/installation/using-vite`

```bash
npm install tailwindcss @tailwindcss/cli @tailwindcss/vite
```
Configure the Vite plugin. Add the `@tailwindcss/vite` plugin to your Vite configuration.

Update `vite.config.ts` file. It will look like the following block.
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## Install postcss and autoprefixer
Install tailwindcss, @tailwindcss/postcss, and postcss via npm with the following command.

```bash
npm install -D @tailwindcss/postcss postcss
npm install -D autoprefixer
```

Then init tailwindcss-cli,

```bash
npx tailwindcss-cli init -p
```

Add this import header in your main css file, `src/index.css` in our case:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ... */
```

Then update `postcss.config.js` file as the following code block.

```json
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
}
```

Configure the tailwind template paths in `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `tsconfig.json`:

```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  }
}
```

Edit `tsconfig.app.json` file
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Paths */
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

Update `vite.config.ts` by adding the following code to the vite.config.ts so your app can resolve paths without error:

```bash
npm install -D @types/node
```

Then edit `vite.config.ts` with the following code block.
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```
## Install React Markdown
Run the following command
```bash
npm install react-markdown
```

## Install Shadcn UI
Run the `shadcn-ui init` command to setup your project:
```
npx shadcn@latest init
```

The command line output should be the following snippet.

```bash
✔ Preflight checks.
✔ Verifying framework. Found Vite.
✔ Validating Tailwind CSS.
✔ Validating import alias.
? Which style would you like to use? » - Use arrow-keys. Return to submit.
>   New York
    Default

? Which color would you like to use as the base color? » - Use arrow-keys. Return to submit.
    Neutral
    Gray
>   Zinc
    Stone
    Slate

✔ Preflight checks.
✔ Verifying framework. Found Vite.
✔ Validating Tailwind CSS.
✔ Validating import alias.
√ Which style would you like to use? » New York
√ Which color would you like to use as the base color? » Zinc
√ Would you like to use CSS variables for theming? ... no / yes
✔ Writing components.json.
✔ Checking registry.
✔ Updating tailwind.config.js
✔ Updating src\index.css
  Installing dependencies.

It looks like you are using React 19.
Some packages may fail to install due to peer dependency issues in npm (see https://ui.shadcn.com/react-19). 

√ How would you like to proceed? » Use --force
✔ Installing dependencies.
✔ Created 1 file:
  - src\lib\utils.ts

Success! Project initialization completed.
```