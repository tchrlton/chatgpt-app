"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { Message as AIMessage } from "ai";
import { useChat } from "ai/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { updateChat } from "@/app/server-actions/updateChat";

import Transcript from "./Transcript";

import { Message } from "@/types";

export default function Chat({
  id = null,
  messages: initialMessages = [],
}: {
  id?: number | null;
  messages?: Message[];
}) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: initialMessages as unknown as AIMessage[],
    });
    const [backendData, setBackendData] = useState([{}]);
  const chatId = useRef<number | null>(id);

  const baseAPIUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    fetch(`${baseAPIUrl}/users`).then(
      response => response.json()
    ).then(
      data => (
        setBackendData(data)
      )
    )
  }, []);

  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (!isLoading && messages.length) {
        const simplifiedMessages = messages.map((message) => ({
          role: message.role as "user" | "assistant",
          content: message.content,
        }));
        const newChatId = await updateChat(chatId.current, simplifiedMessages);
        if (chatId.current === null) {
          router.push(`/chats/${newChatId}`);
          router.refresh();
        } else {
          chatId.current = newChatId;
        }
      }
    })();
  }, [isLoading, messages, router]);

  console.log("backendData", backendData);

  return (
    <div className="flex flex-col">
      <Transcript messages={messages as Message[]} truncate={false} />
      <form className="flex mt-3" onSubmit={handleSubmit}>
        <Input
          className="flex-grow text-xl"
          placeholder="Question"
          value={input}
          onChange={handleInputChange}
          autoFocus
        />
        <Button type="submit" className="ml-3 text-xl">
          Send
        </Button>
      </form>
    </div>
  );
}