"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { db } from "../../firebase/firebase";

type Props = {
  chatId: string;
};

const ChatInput = ({ chatId }: Props) => {
  const { data: session } = useSession();
  const [input, setInput] = useState<string>("");

  const model = "text-davinci-003";

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) return;

    const trimmedInput = input.trim();
    setInput("");

    const message: Message = {
      text: trimmedInput,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user.email!,
        name: session?.user.name!,
        avatar:
          session?.user.image! ||
          `https://ui-avatars.com/api/?name=${session?.user.name!}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    //Toast notification to indicate loading!
    const notification = toast.loading("ChatGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: trimmedInput,
        session,
        chatId,
        model,
      }),
    })
      .then((data) => {
        //Toast notification to say successful!
        toast.success("ChatGPT has responded!", {
          id: notification,
        });
      })
      .catch((err) => {
        console.error(err);
        //Toast notification to say error!
        toast.error("ChatGPT has failed!", {
          id: notification,
        });
      });
  };

  return (
    <div className="bg-gray-700/50 rounded-lg text-sm mx-2 mb-2 md:text-lg">
      <form className="p-4 space-x-5 flex" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!session || !chatId}
        />

        <button
          disabled={!input || !session}
          type="submit"
          className="disabled:text-gray-300 text-blue-500 hover:bg-black disabled:cursor-not-allowed p-2 rounded-lg"
        >
          <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
