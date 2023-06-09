"use client";

import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/firebase";
import Message from "../Message";

type Props = {
  chatId: string;
};

const Chat = ({ chatId }: Props) => {
  const { data: session } = useSession();
  const [messages, loading] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {loading && (
        <div className="text-center mt-5 text-sm md:text-lg">
          <p>Loading...</p>
        </div>
      )}
      {messages?.empty && (
        <div className="text-center mt-5">
          <p className="text-sm md:text-lg">
            Feeling adventurous? Try in a prompt below!
          </p>

          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-4 animate-bounce" />
        </div>
      )}

      <div className="flex flex-col gap-3">
        {messages?.docs.map((message) => (
          <Message key={message.id} message={message.data()} />
        ))}
      </div>
    </div>
  );
};

export default Chat;
