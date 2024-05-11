"use client";

import { login, OTP } from "@/actions";
import { useFormState } from "react-dom";
import { useState } from "react";


const LoginForm = () => {

  const [state, setState] = useState<any>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [otp, setOTP] = useState<string>();
  const [message, setMessage] = useState<string>();

  function otpHandler(e: any) {
    e.preventDefault();
    if (state?.otp == otp) {
      OTP(username, password);
    }
    else {
      setMessage("Wrong OTP, The OTP is " + state?.otp + " Please Enter The Correct OTP");
    };
  };

  async function loginHandler(e: any) {
    e.preventDefault();
    const res = await login(username, password);
    setState(res)
  };

  return (
    <form className="flex flex-col gap-3 m-5 justify-center items-center">
      {!state?.otp ? (<><h1 className="text-md text-stone-600">Please Enter Your Credintials</h1>
        <input className="w-full border border-gray-400 rounded-md h-10 p-2" type="text" name="username" required placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} />
        <input className="w-full border border-gray-400 rounded-md h-10 p-2" type="password" name="password" required placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
        <button className="bg-blue-600 w-1/2 h-7 rounded-md text-white" onClick={(e) => loginHandler(e)}>Login</button>
        {state?.error && <p className="text-red-600">{state?.error}</p>}</>) : (<><h1 className="text-md text-stone-600">Please Enter The OTP</h1>
          <input className="w-full border border-gray-400 rounded-md h-10 p-2" type="text" name="OTP" required placeholder="OTP" onChange={(e) => { setOTP(e.target.value) }} />
          <button className="bg-blue-600 w-1/2 h-7 rounded-md text-white" onClick={(e) => otpHandler(e)}>Submit</button>
          {message && <p className="text-red-600">{message}</p>}
        </>)}
    </form>
  );
};

export default LoginForm;
