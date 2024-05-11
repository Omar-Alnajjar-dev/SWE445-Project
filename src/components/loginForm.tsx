"use client";

import { login } from "@/actions";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);

  return (
    <form className="flex flex-col gap-3 m-5 justify-center items-center" action={formAction}>
      <h1 className="text-md text-stone-600">Please Enter Your Credintials</h1>
      <input className="w-full border border-gray-400 rounded-md h-10 p-2" type="text" name="username" required placeholder="Username" />
      <input className="w-full border border-gray-400 rounded-md h-10 p-2" type="password" name="password" required placeholder="Password" />
      <button className="bg-blue-600 w-1/2 h-7 rounded-md text-white">Login</button>
      {state?.error && <p className="text-red-600">{state.error}</p>}
    </form>
  );
};

export default LoginForm;
