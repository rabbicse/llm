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

Then write the following command to go to the directory `ai-chatbot`

```shell
cd si-chatbot
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
npx shadcn@canary add avatar
npx shadcn@canary add collapsible
npx shadcn@canary add separator
npx shadcn@canary add badge
npx shadcn@canary add dialog
npx shadcn@canary add carousel
npx shadcn@canary add card
npx shadcn@canary add tooltip
```

### next-themes
```shell
npm install next-themes
```

### react-icons
```shell
npm install react-icons
```

### react-textarea-autosize
```shell
npm install react-textarea-autosize
```

### npm install swr
```shell
npm install swr
```

### framer motion
```shell
npm install framer-motion
```

### marked
```shell
npm install marked
```

### react-code-blocks
```shell
npm install react-code-blocks
```

### @radix-ui/react-icons
```shell
npm install @radix-ui/react-icons
```

## Implementation
### theme-privider.tsx
Add `theme-provider.tsx` under components directory with the following code block.
```typescript
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### utils.ts
Add the following function to generate unique ID under `lib/utils.ts`.
```typescript
export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
```

### icons component
Under `components/ui/icons.tsx` add the following code block.
```typescript
'use client'

import { cn } from '@/lib/utils'

function IconLogo({ className, ...props }: React.ComponentProps<'svg'>) {
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 256 256"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('h-4 w-4', className)}
            {...props}
        >
            <circle cx="128" cy="128" r="128" fill="black"></circle>
            <circle cx="102" cy="128" r="18" fill="white"></circle>
            <circle cx="154" cy="128" r="18" fill="white"></circle>
        </svg>
    )
}

export { IconLogo }
```

### header
Add header component under `components/header.tsx` with the following code block.
```typescript
'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { IconLogo } from '@/components/ui/icons'

export const Header: React.FC = () => {
  return (
    <header className="fixed w-full p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div>
        <a href="/">
          <IconLogo className={cn('w-5 h-5')} />
          <span className="sr-only">Mehedi</span>
        </a>
      </div>
    </header>
  )
}

export default Header
```

### footer
Under `components/footer.tsx` write the following code block.
```typescript
'use client'

import Link from 'next/link'
import React from 'react'
import { SiDiscord, SiGithub, SiX } from 'react-icons/si'
import { Button } from './ui/button'

const Footer: React.FC = () => {
  return (
    <footer className="w-fit p-1 md:p-2 fixed bottom-0 right-0 hidden lg:block">
      <div className="flex justify-end">
        <Button
          variant={'ghost'}
          size={'icon'}
          className="text-muted-foreground/50"
        >
          <Link href="https://github.com/rabbicse" target="_blank">
            <SiGithub size={18} />
          </Link>
        </Button>
      </div>
    </footer>
  )
}

export default Footer
```

### interfaces
Add the following code under `src/lib/types.ts`
```typescript
/**
 * AI SDK UI Messages. They are used in the client and to communicate between the frontend and the API routes.
 */
export interface Message {
    /**
    A unique identifier for the message.
     */
    id: string;

    /**
    The timestamp of the message.
     */
    createdAt?: Date;

    /**
    Text content of the message. Use parts when possible.
     */
    content: string;

    /**
    The 'data' role is deprecated.
     */
    role: 'system' | 'user' | 'assistant';

    /**
     * The parts of the message. Use this for rendering the message in the UI.
     *
     * Assistant messages can have text, reasoning and tool invocation parts.
     * User messages can have text parts.
     */
    // note: optional on the Message type (which serves as input)
    parts?: Array<TextUIPart>;
}

/**
 * A text part of a message.
 */
export type TextUIPart = {
    type: 'text';

    /**
     * The text content.
     */
    text: string;
};
```

Then update the `utils.ts` by the following code block.
```typescript
export function fillMessageParts(messages: Message[]): Message[] {
  return messages.map(message => ({
    ...message,
    parts: getMessageParts(message),
  }));
}

export function getMessageParts(message: Message): (TextUIPart)[] {
  return (
    message.parts ?? [
      ...(message.content
        ? [{ type: 'text' as const, text: message.content }]
        : []),
    ]
  );
}
```

### chat
Create `chat` component under `components/chat.tsx` and add the following code block.
```typescript
"use client";

export function Chat({
    id
}: {
    id: string
}) {
    return (
        <div className="flex flex-col w-full max-w-3xl pt-14 pb-60 mx-auto stretch">
            <h1>Welcome To AI Chat!</h1>
            <p> Chat ID: {id}</p>
        </div>
    );
}
```

### Main Page
update `src/app/page.tsx` with the following code block.
```typescript
import { Chat } from "@/components/chat";
import { generateUUID } from "@/lib/utils";

export default function Home() {
  const id = generateUUID();
  return <Chat id={id} />;
}
```

### layout.tsx
Update the `src/app/layout.tsx` with the following code block.
```typescript
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/header";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const title = 'AI Chtbot'
const description =
  'A fully open-source AI-powered chatbot with a generative UI.'

export const metadata: Metadata = {
  metadataBase: new URL('http://rabbi.work'),
  title,
  description,
  openGraph: {
    title,
    description
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
      // `next-themes` injects an extra classname to the body element to avoid
      // visual flicker before hydration. Hence the `suppressHydrationWarning`
      // prop is necessary to avoid the React hydration mismatch warning.
      // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
      suppressHydrationWarning
    >
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### chat-input
Basic chat input should look like the following code block.
```typescript
'use client'

import { cn } from '@/lib/utils'
import { ArrowUp, Square } from 'lucide-react'
import { useRef, useState } from 'react'
import Textarea from 'react-textarea-autosize'
import { Button } from '@/components/ui/button'
import { Message } from '@/lib/types'

interface ChatInputProps {
    userInput: string
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isLoading: boolean
    messages: Message[] | undefined
}

export function ChatInput({
    userInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    messages,
}: ChatInputProps) {
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const [isComposing, setIsComposing] = useState(false) // Composition state
    const [enterDisabled, setEnterDisabled] = useState(false) // Disable Enter after composition ends

    const handleCompositionStart = () => setIsComposing(true)

    const handleCompositionEnd = () => {
        setIsComposing(false)
        setEnterDisabled(true)
        setTimeout(() => {
            setEnterDisabled(false)
        }, 300)
    }

    return (
        <div
            className={cn(
                'mx-auto w-full',
                messages !== undefined && messages.length > 0
                    ? 'fixed bottom-0 left-0 right-0 bg-background'
                    : 'fixed bottom-8 left-0 right-0 top-6 flex flex-col items-center justify-center'
            )}
        >
            <form
                onSubmit={handleSubmit}
                className={cn(
                    'max-w-3xl w-full mx-auto',
                    messages !== undefined && messages.length > 0 ? 'px-2 py-4' : 'px-6'
                )}
            >
                <div className="relative flex flex-col w-full gap-2 bg-muted rounded-3xl border border-input">
                    <Textarea
                        ref={inputRef}
                        name="input"
                        rows={2}
                        maxRows={5}
                        tabIndex={0}
                        onCompositionStart={handleCompositionStart}
                        onCompositionEnd={handleCompositionEnd}
                        placeholder="Ask a question..."
                        spellCheck={false}
                        value={userInput}
                        className="resize-none w-full min-h-12 bg-transparent border-0 px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        onChange={e => {
                            handleInputChange(e)
                        }}
                        onKeyDown={e => {
                            if (
                                e.key === 'Enter' &&
                                !e.shiftKey &&
                                !isComposing &&
                                !enterDisabled
                            ) {
                                if (userInput.trim().length === 0) {
                                    e.preventDefault()
                                    return
                                }
                                e.preventDefault()
                                const textarea = e.target as HTMLTextAreaElement
                                textarea.form?.requestSubmit()
                            }
                        }}
                    />

                    {/* Bottom menu area */}
                    <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-2">
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                type={isLoading ? 'button' : 'submit'}
                                size={'icon'}
                                variant={'outline'}
                                className={cn(isLoading && 'animate-pulse', 'rounded-full')}
                                disabled={userInput.length === 0 && !isLoading}
                                onClick={isLoading ? stop : undefined}
                            >
                                {isLoading ? <Square size={20} /> : <ArrowUp size={20} />}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
```

And updated `chat.tsx` will be the following code block.
```typescript
'use client'

import { ChatInput } from "@/components/chat-input";
import { Message } from "@/lib/types";
import { fillMessageParts } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";

export function Chat({
    id
}: {
    id: string
}) {
    // Input state and handlers.
    const initialInput = "";
    const [inputContent, setInputContent] = useState<string>(initialInput);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Store the chat state in SWR, using the chatId as the key to share states.
    const { data: messages, mutate } = useSWR<Message[]>(
        [id, "messages"],
        null,
        {
            fallbackData: [],
        }
    );

    // Keep the latest messages in a ref.
    const messagesRef = useRef<Message[]>(messages || []);
    useEffect(() => {
        messagesRef.current = messages || [];
    }, [messages]);

    const setMessages = useCallback(
        (messages: Message[] | ((messages: Message[]) => Message[])) => {
            if (typeof messages === "function") {
                messages = messages(messagesRef.current);
            }

            const messagesWithParts = fillMessageParts(messages);
            mutate(messagesWithParts, false);
            messagesRef.current = messagesWithParts;
        },
        [mutate]
    );

    // handlers
    const handleInputChange = (e: any) => {
        setInputContent(e.target.value);
    };

    // handle form submission functionality
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // todo:
    };

    return (
        <div className="flex flex-col w-full max-w-3xl pt-14 pb-60 mx-auto stretch">
            <ChatInput
                userInput={inputContent}
                handleInputChange={handleInputChange}
                handleSubmit={onSubmit}
                isLoading={isLoading}
                messages={messages}
            />
        </div>
    );
}
```

### chat-message


## Run the application
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## References
- [nextjs-chat-ai](https://github.com/addyosmani/nextjs-chat-ai)
