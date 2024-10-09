"use server";
import { auth as getServerSession } from "@/auth";

import { createChat, updateChat as updateChatMessages } from "@/db";

export const updateChat = async (
  chatId: number | null,
  messages: {
    role: "user" | "assistant";
    content: string;
  }[]
) => {
  const session = await getServerSession();
  if (!chatId) {
    return await createChat(
      // eslint-disable-next-line
      session?.user?.name!,
      messages[0].content,
      messages
    );
  } else {
    await updateChatMessages(chatId, messages);
    return chatId;
  }
};