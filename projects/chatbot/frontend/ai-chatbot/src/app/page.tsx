import { Chat } from "@/components/chat";
import { generateUUID } from "@/lib/utils";

export default function Home() {
  const id = generateUUID();
  return <Chat id={id} />;
}