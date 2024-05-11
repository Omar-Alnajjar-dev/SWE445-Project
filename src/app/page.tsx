"use client";
import OtherPlatformAuth from "@/components/OtherPlatformAuth";
import Link from "next/link"
import { use } from "react";

const Homepage = () => {
  return (
    <>
      <div className="border p-14 bg-white rounded-lg p-b-4">
        <h1 className="text-5xl pb-4">Welcome to our App</h1>
        <p>Choose one of the following options to continue...</p>
        <div className="flex flex-col gap-3 justify-center items-center p-5">
          <Link href="/authpage/login"><button className="w-64 h-24 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            Login
          </button></Link>
          <Link href="/authpage/register"><button className="w-64 h-24 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            Register
          </button>
          </Link>
          <OtherPlatformAuth />
        </div>
      </div>
    </>
  )
}

export default Homepage