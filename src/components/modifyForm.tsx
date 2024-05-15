"use client";

import { register, modifyInfo, getUserByID } from "@/actions";
import { SetStateAction, use, useEffect, useState } from "react";
import { useFormState } from "react-dom";

const ModifyForm = () => {
  const [state, formAction] = useFormState<any, FormData>(modifyInfo, undefined);
  const [personId, setPersonId] = useState<number>();
  const [formValues, setFormValues] = useState({
    fName: '',
    mName: '',
    lName: '',
    username: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    gender: 'male',
    address: '',
  });

  const [errors, setErrors] = useState({
    fName: '',
    mName: '',
    lName: '',
    username: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    gender: '',
    address: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    let newErrors = {} as any;

    // Validation rules for each field
    if (formValues.fName.trim() === '') {
      newErrors.fName = 'First Name is required';
    }

    // Repeat this process for each field
    if (formValues.mName.trim() === '') {
      newErrors.mName = 'Middle Name is required';
    }

    if (formValues.lName.trim() === '') {
      newErrors.lName = 'Last Name is required';
    }

    if (formValues.username.trim() === '') {
      newErrors.username = 'Username is required';
    }
    // Check if the username is only letters and numbers
    if (!/^[a-zA-Z0-9]+$/.test(formValues.username)) {
      newErrors.username = 'Username must contain only letters and numbers!';
    }
    // Check if the email is valid
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = 'Email is not valid!';
    }
    // Check if the phone number is valid
    if (!/^\+\d{12}$/.test(formValues.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number is not valid!';
    }
    // Check if the birth date is valid
    if (!/^\d{4}-\d{2}-\d{2}$/.test(formValues.birthDate)) {
      newErrors.birthDate = 'Birth date is not valid!';
    }
    // Check if the gender is valid
    if (!(formValues.gender === "male" || formValues.gender === "female")) {
      newErrors.gender = 'The gender is not valid!';
    }
    // Check if the address is only letters and numbers and spaces
    if (!/^[a-zA-Z0-9\s]+$/.test(formValues.address)) {
      newErrors.address = 'Address must contain only letters and numbers!';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(errors);
    const isValid = validateForm();
    if (isValid === true) {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formAction(formData);
    }
  };

  useEffect(() => {
    fetchDate();
  }, []);

  const fetchDate = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      setPersonId(parseInt(urlParams.get("id") || ""));
      const response = await getUserByID(parseInt(urlParams.get("id") || ""));
      // get the values in the response and set them to the formValues
      setFormValues({
        fName: response.FirstName,
        mName: response.MiddleName,
        lName: response.LastName,
        username: response.Username,
        email: response.Email,
        phoneNumber: response.PhoneNumber,
        birthDate: response.DateOfBirth,
        gender: response.Gender,
        address: response.Address,
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Modify Patient Info</h1>
      {personId && <p>Editing Patient with ID: {personId}</p>}
      <form className="flex flex-col m-5 justify-center items-start" onSubmit={handleSubmit}>
        <label htmlFor="name" className="">Name</label>
        <input className="w-full border border-gray-400 rounded-md h-10 p-2 mb-3" type="text" name="fName" value={formValues.fName} onChange={handleInputChange} required placeholder="First Name" />
        <input className="w-full border border-gray-400 rounded-md h-10 p-2 mb-3" type="text" name="mName" value={formValues.mName} onChange={handleInputChange} required placeholder="Middle Name" />
        <input className="w-full border border-gray-400 rounded-md h-10 p-2 mb-3" type="text" name="lName" value={formValues.lName} onChange={handleInputChange} required placeholder="Last Name" />
        {errors.fName && <div className="text-red-600">{errors.fName}</div>}
        {errors.mName && <div className="text-red-600">{errors.mName}</div>}
        {errors.lName && <div className="text-red-600">{errors.lName}</div>}
        <label htmlFor="username" className="">Username</label>
        <input className="w-full border border-gray-400 rounded-md h-10 p-2 mb-3" type="text" name="username" value={formValues.username} onChange={handleInputChange} required placeholder="Username" />
        {errors.username && <div className="text-red-600">{errors.username}</div>}
        <label htmlFor="email" className="">Email</label>
        <input className="w-full border border-gray-400 rounded-md h-10 p-2 mb-3" type="email" name="email" value={formValues.email} onChange={handleInputChange} required placeholder="Email E.g. john@kfupm.com" />
        {errors.email && <div className="text-red-600">{errors.email}</div>}
        <label htmlFor="phoneNumber" className="">Phone Number</label>
        <input className="w-full border border-gray-400 rounded-md h-10 p-2 mb-3" type="tel" name="phoneNumber" value={formValues.phoneNumber} onChange={handleInputChange} required placeholder="Phone Number E.g. +966500000000" />
        {errors.phoneNumber && <div className="text-red-600">{errors.phoneNumber}</div>}
        <label htmlFor="birthDate" className="">Date of Birth</label>
        <input className="w-full border border-gray-400 rounded-md h-10 p-2 mb-3" type="date" name="birthDate" value={formValues.birthDate} onChange={handleInputChange} required placeholder="" />
        {errors.birthDate && <div className="text-red-600">{errors.birthDate}</div>}
        <label htmlFor="gender" className="">Gender</label>
        <fieldset className="w-full flex justify-around items-center mb-3" onChange={handleInputChange}>
          <div>
            <input id="maleRadio" className="" value="male" type="radio" name="gender" checked={formValues.gender === "male"} />
            <label htmlFor="maleRadio">Male</label>
          </div>
          <div>
            <input id="femaleRadio" className="" value="female" type="radio" name="gender" checked={formValues.gender === "female"} />
            <label htmlFor="femaleRadio">Female</label>
          </div>
        </fieldset>
        {errors.gender && <div className="text-red-600">{errors.gender}</div>}
        <label htmlFor="address" className="">Address</label>
        <input className="w-full border border-gray-400 rounded-md h-10 p-2 mb-3" type="text" name="address" value={formValues.address} onChange={handleInputChange} required placeholder="Address E.g. Saudi Arabia, Dhahran" />
        {errors.address && <div className="text-red-600">{errors.address}</div>}
        <button className="bg-blue-600 w-1/2 h-7 rounded-md text-white">Create Account</button>
        {state?.error && <p className="text-red-600">{state.error}</p>}
      </form >
    </>
  );
};

export default ModifyForm;
