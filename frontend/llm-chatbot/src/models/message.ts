export type Message = {
    id: string;
    role: "user" | "ai";
    content: string;
    loading: boolean;
    timestamp: string;
    error: string;
};