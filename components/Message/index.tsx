import { DocumentData } from "firebase/firestore";
import React from "react";

interface IMessageProps {
  message: DocumentData;
}

const Message = (props: IMessageProps) => {
  const { message } = props;
  const isChatGPT = message.user.name === "ChatGPT";

  return (
    <div className={`py-5 ${isChatGPT ? "bg-[#434654]" : ""}`}>
      <div className="flex items-center gap-4 px-3 md:px-5 max-w-2xl">
        <img src={message.user.avatar} alt="Profile pic" className="h-8 w-8" />

        <p className="pt-1 text-sm md:text-lg">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
