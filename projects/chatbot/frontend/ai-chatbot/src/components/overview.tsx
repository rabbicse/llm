import { motion } from "framer-motion";
import Link from "next/link";

import { AILogo } from "@/components/ui/icons";

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
      <div className="rounded-xl p-6 flex flex-col gap-4 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center">
          <AILogo width={48} height={48} />
          {/* <span>+</span>
                    <MessageIcon size={48} /> */}
        </p>
        <p className="text-center text-lg text-muted-foreground gap-1">
          How can I help you today?
        </p>
        <p className="gap-1 items-center">
          This is an open-source AI chatbot built with React 19, Next.js 15,
          Python, FastAPI, and the Ollama SDK. Learn more at{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://ollama.com/"
            target="_blank"
          >
            ollama
          </Link>{" "}
          and{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://fastapi.tiangolo.com/"
            target="_blank"
          >
            fastapi
          </Link>
          .
        </p>
      </div>
    </motion.div>
  );
};
