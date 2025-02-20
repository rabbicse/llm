// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const backendUrl = "http://127.0.0.1:8000/chat/stream"; // FastAPI server

//     // Parse the incoming request body
//     const { messages } = await req.json();

//     // Find the last user message in the array
//     const lastUserMessage =
//       messages
//         .reverse()
//         .find((msg: { role: string; content: string }) => msg.role === "user")
//         ?.content || "";

//     // Log the last user message for debugging
//     console.log("Last user message:", lastUserMessage);

//     // Prepare the payload to send to the backend
//     const payload = JSON.stringify({
//       query: lastUserMessage,
//     });

//     const response = await fetch(backendUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: payload,
//     });

//     // Clone the response to avoid disturbing the original body
//     const clonedResponse = response.clone();

//     // Return the cloned response as a stream
//     return new NextResponse(clonedResponse.body, {
//       headers: {
//         "Content-Type": "text/event-stream",
//       },
//     });

//     // if (response.ok) {
//     //   // Read the response body as text (assuming it's not a large stream)
//     //   const responseText = await response.text();

//     //   // Log the response body for debugging
//     //   console.log("Backend Response:", responseText);
//     // }
//   } catch (error) {
//     console.error("Error in POST /api/chat:", error);
//     return new NextResponse(
//       JSON.stringify({ error: "Internal Server Error" }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }
// }


import { openai } from '@ai-sdk/openai';
import { generateId, createDataStreamResponse, streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // immediately start streaming (solves RAG issues with status, etc.)
  return createDataStreamResponse({
    execute: dataStream => {
      dataStream.writeData('initialized call');

      const result = streamText({
        model: openai('gpt-4o'),
        messages,
        onChunk() {
          dataStream.writeMessageAnnotation({ chunk: '123' });
        },
        onFinish() {
          // message annotation:
          dataStream.writeMessageAnnotation({
            id: generateId(), // e.g. id from saved DB record
            other: 'information',
          });

          // call annotation:
          dataStream.writeData('call completed');
        },
      });

      result.mergeIntoDataStream(dataStream);
    },
    onError: error => {
      // Error messages are masked by default for security reasons.
      // If you want to expose the error message to the client, you can do so here:
      return error instanceof Error ? error.message : String(error);
    },
  });
}