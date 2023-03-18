// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import query from "../../lib/queryApi";
import { adminDB } from "../../firebase/firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, session, model } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a chatId" });
    return;
  }

  //ChatGPT query
  const response = await query(prompt, model);

  const message: Message = {
    text:
      response ||
      "ChatGPT could not find an answer for this question. Please try again.",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://links.papareact.com/89k",
    },
  };

  await adminDB
    .collection("users")
    .doc(session?.user.email!)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
