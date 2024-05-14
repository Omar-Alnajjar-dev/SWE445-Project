"use client";

import { getUserByID } from "@/actions";
import { url } from "inspector";
import { use, useEffect, useState } from "react";
import { useFormState } from "react-dom";

const RegisterForm = () => {
  const [state, setState] = useState<any>();
  const [form, setForm] = useState({
    fName: "",
    mName: "",
    lName: "",
    username: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
  });

  useEffect(() => {
    console.log(form);
  }, []);

  const fetchDate = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const response = await getUserByID(parseInt(urlParams.get("id") || ""));
      setState(response);
    } catch (error) {
      console.error(error);
    }

  };


  const getFormData = (e: any) => {
    setForm({
      fName: e.target.fName.value,
      mName: e.target.mName.value,
      lName: e.target.lName.value,
      username: e.target.username.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
      birthDate: e.target.birthDate.value,
      gender: e.target.gender.value,
    });
  };

  return (
    <form className="flex flex-col m-5 justify-center items-start" action={getFormData}>
      <label htmlFor="fName" className="">Name</label>
      <input className="w-full border border-gray-400 rounded-md h-10 p-2 mb-3" type="text" name="fName" required placeholder="First Name" />
      <input className="w-full border border-gray-400 rounded-md h-10 p-2 mb-3" type="text" name="mName" required placeholder="Middle Name" />
      <input className="w-full border border-gray-400 rounded-md h-10 p-2 mb-3" type="text" name="lName" required placeholder="Last Name" />
      <label htmlFor="username" className="">Username</label>
      <input className="w-full border border-gray-400 rounded-md h-10 p-2 mb-3" type="text" name="username" required placeholder="Username" />
      <label htmlFor="email" className="">Email</label>
      <input className="w-full border border-gray-400 rounded-md h-10 p-2 mb-3" type="email" name="email" required placeholder="Email E.g. john@kfupm.com" />
      <label htmlFor="phoneNumber" className="">Phone Number</label>
      <input className="w-full border border-gray-400 rounded-md h-10 p-2 mb-3" type="tel" name="phoneNumber" required placeholder="Phone Number E.g. +966500000000" />
      <label htmlFor="birthDate" className="">Date of Birth</label>
      <input className="w-full border border-gray-400 rounded-md h-10 p-2 mb-3" type="date" name="birthDate" required placeholder="" />
      <label htmlFor="gender" className="">Gender</label>
      <fieldset className="w-full flex justify-around items-center mb-3">
        <div>
          <input id="maleRadio" className="" value="male" type="radio" name="gender" checked />
          <label htmlFor="maleRadio">Male</label>
        </div>
        <div>
          <input id="femaleRadio" className="" value="female" type="radio" name="gender" />
          <label htmlFor="femaleRadio">Female</label>
        </div>
      </fieldset>
      <label htmlFor="address" className="">Address</label>
      <input className="w-full border border-gray-400 rounded-md h-10 p-2 mb-3" type="text" name="address" required placeholder="Address E.g. Saudi Arabia, Dhahran" />
      <button className="bg-blue-600 w-1/2 h-7 rounded-md text-white">Create Account</button>
      {state?.error && <p className="text-red-600">{state.error}</p>}
    </form>
  );
};

export default RegisterForm;
