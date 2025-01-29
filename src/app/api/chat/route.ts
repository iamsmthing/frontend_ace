// app/api/chat/route.ts
import Together from "together-ai";

const together = new Together({apiKey:process.env.NEXT_PUBLIC_API_KEY!});

export async function POST(request: Request) {
  const { messages } = await request.json();

  const res = await together.chat.completions.create({
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    messages,
    stream: true,
  });

  return new Response(res.toReadableStream());
}