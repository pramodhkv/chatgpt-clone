"use client";
import React, { MouseEvent } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from ".././../public/logo.png";

const Login = () => {
  const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn("google");
  };

  return (
    <div className="bg-body h-screen flex flex-col gap-4 items-center justify-center text-white text-center">
      <Image src={logo} alt="Logo" />

      <h1 className="text-lg">Welcome to ChatGPT</h1>

      <p>Log in with your OpenAI account to continue</p>

      <button
        className="bg-gradient-to-r from-teal-400 to-teal-600 px-6 py-2 rounded-md hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-400"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
