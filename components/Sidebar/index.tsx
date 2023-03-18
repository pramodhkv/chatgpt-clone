"use client";

import React, { MouseEvent } from "react";
import NewChat from "../NewChat";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import ChatRow from "../ChatRow";
import CustomButton from "../CustomButton";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );

  const handleSignOut = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut();
  };

  return (
    <div className="p-2 flex flex-col h-screen max-w-xs overflow-y-auto bg-sidebar text-white md:min-w-[20rem]">
      <div className="flex-1">
        <NewChat />

        <div className="flex flex-col gap-3 my-6">
          {loading && (
            <div className="text-center mt-5 text-sm md:text-lg">
              <p>Loading...</p>
            </div>
          )}

          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>

      {session && (
        <CustomButton
          onClick={handleSignOut}
          icon={ArrowLeftOnRectangleIcon}
          text="Logout"
        />
      )}
    </div>
  );
};

export default Sidebar;
