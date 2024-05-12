"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const { getUsers, getUser, isAdmin, getAllPatients } = require('@/dbService');

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

// export const register = async (
//   revState: { error: undefined | string },
//   formData: FormData
// ) => {
//   const session = await getSession();

//   const formUsername = formData.get("username") as string;
//   const formPassword = formData.get("password") as string;

//   // CHECK IF USER EXISTS
//   // const user = await db.getUser({username})

//   if (formUsername === username) {
//     return { error: "User already exists!" };
//   }

//   username = formUsername;
//   session.username = username;
//   session.userId = "1";
//   session.isLoggedIn = true;

//   await session.save();
//   redirect("/");


// };

export const getPatients = async () => {
  const session = await getSession();
  if (session.isAdmin) {
    const patients = await getAllPatients();
    console.log("patients were sent")
    console.log(patients)
    return patients;
  } else {
    console.log("Unauthorized");
    return { error: "Unauthorized" };
  }

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
