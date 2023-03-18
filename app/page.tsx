import React from "react";
import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import DisplayInfo from "../components/DisplayInfo";

const Page = () => {
  const examplesTextArr: string[] = [
    "Explain something to me",
    "What's the difference between a dog and a cat?",
    "What is the color of the sun?",
  ];
  const capabilitiesTextArr: string[] = [
    "Change the ChatGPT model to use",
    "Messages are stored in Firebase's Firestore",
    "Hot Toast notifications when ChatGPT is thinking!",
  ];
  const limitationsTextArr: string[] = [
    "May occasionally generate incorrect information",
    "May occasionally produce harmful instructions or biased content",
    "Limited knowledge of world and events after 2021",
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen px-2">
      <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>

      <div className="flex space-x-2 text-center">
        <DisplayInfo
          header="Examples"
          listItems={examplesTextArr}
          icon={SunIcon}
        />

        <DisplayInfo
          header="Capabilities"
          listItems={capabilitiesTextArr}
          icon={BoltIcon}
        />

        <DisplayInfo
          header="Limitations"
          listItems={limitationsTextArr}
          icon={ExclamationTriangleIcon}
        />
      </div>
    </div>
  );
};

export default Page;
