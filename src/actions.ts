"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const { getUsers } = require('@/dbService');

let isAdmin = true;
let isBlocked = true;

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  // CHECK THE USER IN THE DB
  session.isBlocked = isBlocked;
  session.isAdmin = isAdmin;

  return session;
};

export const login = async (
  name: any,
  password: any
) => {
  const session = await getSession();

  const formUsername = name as string;
  const formPassword = password as string;

  // CHECK USER IN THE DB
  let username = "";
  let hashedPassword = "";
  const users = await getUsers();

  users.forEach((user: { Username: string; PasswordHash: string }) => {
    if (user.Username === formUsername && user.PasswordHash === formPassword) {
      username = user.Username;
      hashedPassword = user.PasswordHash;
    }
  });

  if (formUsername !== username || formPassword !== hashedPassword) {
    return { error: "Wrong Credentials!" };
  }

  const otp = Math.round(Math.random() * 1000)
  return { otp: otp };
};

export const OTP = async (
  name: any,
  password: any,
) => {
  const session = await getSession();

  const formUsername = name as string;
  const formPassword = password as string;

  // CHECK USER IN THE DB
  // const user = await db.getUser({username,password})

  session.userId = "1";
  session.username = formUsername;
  session.isAdmin = isAdmin;
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

  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;

  // CHECK IF USER EXISTS
  // const user = await db.getUser({username})

  if (formUsername === username) {
    return { error: "User already exists!" };
  }

  username = formUsername;
  session.username = username;
  session.userId = "1";
  session.isLoggedIn = true;

  await session.save();
  redirect("/");


};

export const changePremium = async () => {
  const session = await getSession();

  isAdmin = !session.isAdmin;
  session.isAdmin = isAdmin;
  await session.save();
  revalidatePath("/profile");
};

export const changeUsername = async (formData: FormData) => {
  const session = await getSession();

  const newUsername = formData.get("username") as string;

  username = newUsername;

  session.username = username;
  await session.save();
  revalidatePath("/profile");
};
