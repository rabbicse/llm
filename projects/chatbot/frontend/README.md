# AI Chatbot UI

## Prerequisites

- React 19+
- Nextjs 15+
- Typescript

## Installation

Open your terminal and write the following command to get started.

```bash
npx create-next-app@latest
```

Follow the installation instructions like the following snippet.

```bash
❯ npx create-next-app@latest
Need to install the following packages:
create-next-app@15.1.7
Ok to proceed? (y) y

✔ What is your project named? … chatbot-client
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
Creating a new Next.js app in /Users/mehmet/Projects/github/llm/projects/chatbot/frontend/chatbot-client.

Using npm.

Initializing project with template: app-tw


Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- typescript
- @types/node
- @types/react
- @types/react-dom
- postcss
- tailwindcss
- eslint
- eslint-config-next
- @eslint/eslintrc


added 377 packages, and audited 378 packages in 1m

144 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Success! Created chatbot-client at /Users/mehmet/Projects/github/llm/projects/chatbot/frontend/chatbot-client

npm notice
npm notice New major version of npm available! 10.9.2 -> 11.1.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.1.0
npm notice To update run: npm install -g npm@11.1.0
npm notice
```

Then write the following command to go to the directory `chatbot-client`

```shell
cd chatbot-client
```

Then go to `https://ui.shadcn.com/docs/installation/next` to check the shadcn installation inside nextjs project.

1. Run the init command to create a new Next.js project or to setup an existing one:

```shell
npx shadcn@latest init
```

For React 19+ and Nextjs 15+ use the following command

```shell
npx shadcn@canary init
```

2. You will be asked a few questions to configure `components.json`:

```shell
❯ npx shadcn@latest init

Need to install the following packages:
shadcn@2.3.0
Ok to proceed? (y)

✔ Preflight checks.
✔ Verifying framework. Found Next.js.
✔ Validating Tailwind CSS.
✔ Validating import alias.
✔ Which style would you like to use? › New York
✔ Which color would you like to use as the base color? › Zinc
✔ Would you like to use CSS variables for theming? … no / yes
✔ Writing components.json.
✔ Checking registry.
✔ Updating tailwind.config.ts
✔ Updating src/app/globals.css
  Installing dependencies.

It looks like you are using React 19.
Some packages may fail to install due to peer dependency issues in npm (see https://ui.shadcn.com/react-19).

✔ How would you like to proceed? › Use --force
✔ Installing dependencies.
✔ Created 1 file:
  - src/lib/utils.ts

Success! Project initialization completed.
You may now add components.
```

For React 19 and Nextjs 15+
```shell
❯ npx shadcn@canary init
✔ Preflight checks.
✔ Verifying framework. Found Next.js.
✔ Validating Tailwind CSS.
✔ Validating import alias.
√ Which style would you like to use? » New York (Recommended)
√ Which color would you like to use as the base color? » Zinc
√ Would you like to use CSS variables for theming? ... no / yes
✔ Writing components.json.
✔ Checking registry.
✔ Updating tailwind.config.ts
✔ Updating src\app\globals.css
  Installing dependencies.

It looks like you are using React 19.
Some packages may fail to install due to peer dependency issues in npm (see https://ui.shadcn.com/react-19).

√ How would you like to proceed? » Use --legacy-peer-deps
✔ Installing dependencies.
✔ Created 1 file:
  - src\lib\utils.ts

Success! Project initialization completed.
You may now add components.
```

Update `global.css` file as the following snippet.
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
    --foreground-rgb: 0, 0, 0;
    --background-start-rgb: 214, 219, 220;
    --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
    :root {
        --foreground-rgb: 255, 255, 255;
        --background-start-rgb: 0, 0, 0;
        --background-end-rgb: 0, 0, 0;
    }
}

@layer utilities {
    .text-balance {
        text-wrap: balance;
    }
}

@layer base {
    :root {
        --background: 0 0% 100%;
        --foreground: 240 10% 3.9%;
        --card: 0 0% 100%;
        --card-foreground: 240 10% 3.9%;
        --popover: 0 0% 100%;
        --popover-foreground: 240 10% 3.9%;
        --primary: 240 5.9% 10%;
        --primary-foreground: 0 0% 98%;
        --secondary: 240 4.8% 95.9%;
        --secondary-foreground: 240 5.9% 10%;
        --muted: 240 4.8% 95.9%;
        --muted-foreground: 240 3.8% 46.1%;
        --accent: 240 4.8% 95.9%;
        --accent-foreground: 240 5.9% 10%;
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 0 0% 98%;
        --border: 240 5.9% 90%;
        --input: 240 5.9% 90%;
        --ring: 240 10% 3.9%;
        --chart-1: 12 76% 61%;
        --chart-2: 173 58% 39%;
        --chart-3: 197 37% 24%;
        --chart-4: 43 74% 66%;
        --chart-5: 27 87% 67%;
        --radius: 0.5rem;
        --sidebar-background: 0 0% 98%;
        --sidebar-foreground: 240 5.3% 26.1%;
        --sidebar-primary: 240 5.9% 10%;
        --sidebar-primary-foreground: 0 0% 98%;
        --sidebar-accent: 240 4.8% 95.9%;
        --sidebar-accent-foreground: 240 5.9% 10%;
        --sidebar-border: 220 13% 91%;
        --sidebar-ring: 217.2 91.2% 59.8%;
    }
    .dark {
        --background: 240 10% 3.9%;
        --foreground: 0 0% 98%;
        --card: 240 10% 3.9%;
        --card-foreground: 0 0% 98%;
        --popover: 240 10% 3.9%;
        --popover-foreground: 0 0% 98%;
        --primary: 0 0% 98%;
        --primary-foreground: 240 5.9% 10%;
        --secondary: 240 3.7% 15.9%;
        --secondary-foreground: 0 0% 98%;
        --muted: 240 3.7% 15.9%;
        --muted-foreground: 240 5% 64.9%;
        --accent: 240 3.7% 15.9%;
        --accent-foreground: 0 0% 98%;
        --destructive: 0 62.8% 30.6%;
        --destructive-foreground: 0 0% 98%;
        --border: 240 3.7% 15.9%;
        --input: 240 3.7% 15.9%;
        --ring: 240 4.9% 83.9%;
        --chart-1: 220 70% 50%;
        --chart-2: 160 60% 45%;
        --chart-3: 30 80% 55%;
        --chart-4: 280 65% 60%;
        --chart-5: 340 75% 55%;
        --sidebar-background: 240 5.9% 10%;
        --sidebar-foreground: 240 4.8% 95.9%;
        --sidebar-primary: 224.3 76.3% 48%;
        --sidebar-primary-foreground: 0 0% 100%;
        --sidebar-accent: 240 3.7% 15.9%;
        --sidebar-accent-foreground: 240 4.8% 95.9%;
        --sidebar-border: 240 3.7% 15.9%;
        --sidebar-ring: 217.2 91.2% 59.8%;
    }
}

@layer base {
    * {
        @apply border-border;
    }

    body {
        @apply bg-background text-foreground;
    }

    @font-face {
        font-family: "geist";
        font-style: normal;
        font-weight: 100 900;
        src: url(/fonts/geist.woff2) format("woff2");
    }

    @font-face {
        font-family: "geist-mono";
        font-style: normal;
        font-weight: 100 900;
        src: url(/fonts/geist-mono.woff2) format("woff2");
    }
}

.skeleton {
    * {
        pointer-events: none !important;
    }

    *[class^="text-"] {
        color: transparent;
        @apply rounded-md bg-foreground/20 select-none animate-pulse;
    }

    .skeleton-bg {
        @apply bg-foreground/10;
    }

    .skeleton-div {
        @apply bg-foreground/20 animate-pulse;
    }
}

.ProseMirror {
    outline: none;
}

.cm-editor,
.cm-gutters {
    @apply bg-background dark:bg-zinc-800 outline-none selection:bg-zinc-900 !important;
}

.ͼo.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground,
.ͼo.cm-selectionBackground,
.ͼo.cm-content::selection {
    @apply bg-zinc-200 dark:bg-zinc-900 !important;
}

.cm-activeLine,
.cm-activeLineGutter {
    @apply bg-transparent !important;
}

.cm-activeLine {
    @apply rounded-r-sm !important;
}

.cm-lineNumbers {
    @apply min-w-7;
}

.cm-foldGutter {
    @apply min-w-3;
}

.cm-lineNumbers .cm-activeLineGutter {
    @apply rounded-l-sm !important;
}

.suggestion-highlight {
    @apply bg-blue-200 hover:bg-blue-300 dark:hover:bg-blue-400/50 dark:text-blue-50 dark:bg-blue-500/40;
}
```

## Install necessary packages
### next-themes
```shell
npm install next-themes
```

### react-icons
```
npm install react-icons
```

## Shadcn-ui
Add the following components.
```shell
npx shadcn@latest add alert-dialog
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dropdown-menu
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add select
npx shadcn@latest add separator
npx shadcn@latest add sheet
npx shadcn@latest add sidebar
npx shadcn@latest add skeleton
npx shadcn@latest add textarea
npx shadcn@latest add tooltip
```

or, for React 19+ and Nextjs 15+ use the following commands.
```shell
npx shadcn@canary add button
npx shadcn@canary add sonner
npx shadcn@canary add collapsible
npx shadcn@canary add separator
npx shadcn@canary add badge
npx shadcn@canary add avatar
npx shadcn@canary add dialog
npx shadcn@canary add carousel
npx shadcn@canary add card
npx shadcn@canary add tooltip
```

### react-textarea-autosize
```shell
npm install react-textarea-autosize
```

### rehype
```shell
npm install rehype-external-links
npm install rehype-katex
```

### remark
```shell
npm install remark-gfm
npm install remark-math
```

### react-markdown
```shell
npm install react-markdown
```

### react-syntax-highlighter
```shell
npm install react-syntax-highlighter
```

### usehooks-ts
```shell
npm install usehooks-ts
```

### date-fns
```shell
npm install date-fns
```

### react-data-grid
```shell
npm install react-data-grid
```

### papaparse
```shell
npm install papaparse
npm install --save-dev @types/papaparse
```

### prosemirror-view
```shell
npm install prosemirror-view
```

### prosemirror-inputrules
```shell
npm install prosemirror-inputrules
```

### prosemirror-example-setup
```shell
npm install prosemirror-example-setup
```

### npm install prosemirror-markdown
```shell
npm install prosemirror-markdown
```

### prosemirror-schema-basic
```shell
npm install prosemirror-schema-basic
```

### framer-motion
```shell
npm install framer-motion
```

### date-fns
```shell
npm install date-fns
```

### codemirror
```shell
npm install codemirror
```

### classnames
```shell
npm install classnames
```

### @codemirror/theme-one-dark
```shell
npm install @codemirror/theme-one-dark
```

### @codemirror/lang-python
```shell
npm install @codemirror/lang-python
```

### bcrypt-ts
```shell
npm install bcrypt-ts
```

### postgres
```shell
npm install postgres
```

### next-auth
```shell
npm install next-auth
```

## @ai-sdk
```shell
npm install @ai-sdk/fireworks
npm install @ai-sdk/openai
```

### Add `ai` package
```shell
npm install @ai-sdk/react
```

## Stream parsing:
- [use-chat](https://github.com/vercel/ai/blob/main/packages/solid/src/use-chat.ts)
- [Stream parsing](https://blog.logrocket.com/using-fetch-event-source-server-sent-events-react/)
 
## SVG Logo
To convert an svg logo to embed within react need to follow the steps below.
- https://simpleicons.org/ to download logo in svg
- Go to [](https://nikitahl.github.io/svg-2-code/)
- Copy code to clipboard
- https://react-svgr.com/playground/ to convert as react
- https://github.com/homarr-labs/dashboard-icons