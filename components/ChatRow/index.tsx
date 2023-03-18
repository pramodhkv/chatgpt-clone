import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/firebase";

interface IChatRowProps {
  id: string;
}

const ChatRow = (props: IChatRowProps) => {
  const { id } = props;
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const active = pathName?.includes(id) || false;

  const [messages] = useCollection(
    query(
      collection(db, "users", session?.user.email!, "chats", id, "messages"),
      orderBy("createdAt", "asc")
    )
  );

  const handleDeleteChat = async () => {
    await deleteDoc(doc(db, "users", session?.user.email!, "chats", id));

    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`flex justify-between items-center py-4 px-2 rounded-lg ${
        active ? "bg-gray-700/50" : ""
      } hover:bg-gray-700/50`}
    >
      <div className="flex justify-center items-center space-x-3">
        <ChatBubbleLeftIcon className="w-5 h-5" />
        <p className="flex-1 hidden md:inline-flex truncate">
          {messages?.docs[messages?.docs.length - 1]
            ?.data()
            .text.slice(0, 35) || "New Chat"}
        </p>
      </div>
      <TrashIcon
        className="w-5 h-5 text-gray-500 hover:text-red-500"
        onClick={handleDeleteChat}
      />
    </Link>
  );
};

export default ChatRow;
