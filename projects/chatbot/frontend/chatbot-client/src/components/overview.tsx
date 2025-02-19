import { motion } from 'framer-motion';
import Link from 'next/link';

import { MessageIcon, OllamaIcon } from './icons';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center">
          <OllamaIcon size={48} />
          <span>+</span>
          <MessageIcon size={48} />
        </p>
        <p>
          This is an open source AI chatbot built with React 19, Next.js 15, Python, FastAPI and the Ollama SDK. It uses
          the{' '}
          <code className="rounded-md bg-muted px-1 py-0.5">streamText</code>{' '}
          function in the server to create a seamless chat experience.
        </p>
        <p>
          You can learn more about the Ollama by visiting the{' '}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://ollama.com/"
            target="_blank"
          >   
          ollama.com       
          </Link>{' '}
          and FastAPI by visiting the{' '}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://fastapi.tiangolo.com/"
            target="_blank"
          >          
          fastapi.tiangolo.com
          </Link>.
        </p>
      </div>
    </motion.div>
  );
};