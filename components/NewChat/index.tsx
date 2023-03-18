"use client";

import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import CustomButton from "../CustomButton";

const NewChat = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleCreateChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user.email!, "chats"),
      {
        userId: [session?.user.email!],
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/chat/${doc.id}`);
  };

  return (
    <CustomButton
      onClick={handleCreateChat}
      icon={PlusIcon}
      text="New Chat"
      className="justify-start"
    />
  );
};

export default NewChat;
