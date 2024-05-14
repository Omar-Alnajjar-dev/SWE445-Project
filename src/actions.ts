"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const { getAllUsers, getUser, isAdmin, getAllPatients, getAllUserswithRole, getByID, checkUsers, insertUser } = require('@/dbService');

// let isAdmin = true;
let isBlocked = true;

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  // CHECK THE USER IN THE DB
  session.isBlocked = false;

  return session;
};

export const login = async (
  username: any,
  password: any
) => {
  const session = await getSession();

  const formUsername = username as string;
  const formPassword = password as string;

  // CHECK USER IN THE DB
  const user = await getUser(formUsername, formPassword);

  if (user === undefined) {
    return { error: "Wrong Credentials!" };
  }

  const otp = Math.round(Math.random() * 1000000).toString().padStart(6, "0");
  console.log("OTP: ", otp);
  return { otp: otp };
};

export const OTP = async (
  username: any,
  password: any,
) => {
  const session = await getSession();

  const formUsername = username as string;
  const formPassword = password as string;

  // CHECK USER IN THE DB
  const user = await getUser(formUsername, formPassword);
  const UserIsAdmin = await isAdmin(user.Username) === 1 ? true : false;

  session.userId = user.PersonID;
  session.username = user.Username;
  session.isAdmin = UserIsAdmin;
  session.isLoggedIn = true;
  await session.save();
  redirect('/dashboard')
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};

export const register = async (
  revState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();
  console.log(formData);

  const formFName = formData.get("fName") as string;
  const formMName = formData.get("mName") as string;
  const formLName = formData.get("lName") as string;
  const formUsername = formData.get("username") as string;
  const formEmail = formData.get("email") as string;
  const formPassword = formData.get("password") as string;
  const formRepeatPassword = formData.get("repeatPassword") as string;
  const formPhoneNumber = formData.get("phoneNumber") as string;
  const formBirthDate = formData.get("birthDate") as string;
  const formGender = formData.get("gender") as string;
  const formAddress = formData.get("address") as string;

  // CHECK IF USER EXISTS
  const isUserExists = await checkUsers(formUsername, formEmail);

  if (isUserExists) {
    return { error: "Username or Email already exists!" };
  }
  // Check if the password and repeat password are the same
  if (formPassword !== formRepeatPassword) {
    return { error: "Passwords do not match!" };
  }
  // check the formFName and formMName and formLName are not empty
  if (formFName.trim() === "") {
    return { error: "First Name is required!" };
  }
  if (formMName.trim() === "") {
    return { error: "Middle Name is required!" };
  }
  if (formLName.trim() === "") {
    return { error: "Last Name is required!" };
  }

  // Check if the password is less than 8 characters
  if (formPassword.length < 8) {
    return { error: "Password must be at least 8 characters!" };
  }
  // Check if the password contains at least one number
  if (!/\d/.test(formPassword)) {
    return { error: "Password must contain at least one number!" };
  }
  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(formPassword)) {
    return { error: "Password must contain at least one lowercase letter!" };
  }
  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(formPassword)) {
    return { error: "Password must contain at least one uppercase letter!" };
  }
  // Check if the password contains at least one special character
  if (!/[!@#$%^&*]/.test(formPassword)) {
    return { error: "Password must contain at least one special character! (one of these ! @ # $ % ^ & * )" };
  }
  // Check if the username is only letters and numbers
  if (!/^[a-zA-Z0-9]+$/.test(formUsername)) {
    return { error: "Username must contain only letters and numbers!" };
  }
  // Check if the email is valid
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail)) {
    return { error: "Email is not valid!" };
  }
  // Check if the phone number is valid
  if (!/^\+\d{12}$/.test(formPhoneNumber)) {
    return { error: "Phone number is not valid!" };
  }
  // Check if the birth date is valid
  if (!/^\d{4}-\d{2}-\d{2}$/.test(formBirthDate)) {
    return { error: "Birth date is not valid!" };
  }
  // Check if the gender is valid
  if (!(formGender === "male" || formGender === "female")) {
    return { error: "The Gender is not valid!" };
  }
  // Check if the address is only letters and numbers and spaces
  if (!/^[a-zA-Z0-9\s]+$/.test(formAddress)) {
    return { error: "Address must contain only letters and numbers!" };
  }




  // INSERT USER INTO DB
  const insert = await insertUser(
    formFName,
    formMName,
    formLName,
    formUsername,
    formEmail,
    formPassword,
    formPhoneNumber,
    formBirthDate,
    formGender,
    formAddress
  );
  console.log(insert);

  session.username = formUsername;
  session.userId = "1";
  session.isLoggedIn = true;

  await session.save();
  redirect("/dashboard");


};

export const getPatients = async () => {
  const session = await getSession();
  if (session.isAdmin) {
    const patients = await getAllPatients();
    return patients;
  } else {
    console.log("Unauthorized");
    return { error: "Unauthorized" };
  }

};

export const getUsers = async () => {
  const session = await getSession();
  if (session.isAdmin) {
    const users = await getAllUsers();
    return users;
  } else {
    console.log("Unauthorized");
    return { error: "Unauthorized" };
  }

};

export const getUserswithRoles = async () => {
  const session = await getSession();
  if (session.isAdmin) {
    const users = await getAllUserswithRoles();
    return users;
  } else {
    console.log("Unauthorized");
    return { error: "Unauthorized" };
  }

};

export const getUserByID = async (id: number) => {

  const user = await getByID(id);
  return user;

};


// export const changePremium = async () => {
//   const session = await getSession();

//   isAdmin = !session.isAdmin;
//   session.isAdmin = isAdmin;
//   await session.save();
//   revalidatePath("/profile");
// };

// export const changeUsername = async (formData: FormData) => {
//   const session = await getSession();

//   const newUsername = formData.get("username") as string;

//   username = newUsername;

//   session.username = username;
//   await session.save();
//   revalidatePath("/profile");
// };
