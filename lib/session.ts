"use server";
import {  User } from "@prisma/client";
import * as jose from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findUserById } from "./db/users";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const KEY = new TextEncoder().encode(process.env.JWT_SECRET);
const USER_SESSION_KEY = "_USER_SESSION";

export const getToken = () => cookies().get(USER_SESSION_KEY); // TODO: Remove this function

export const getSession = async (_token: RequestCookie | undefined) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get(USER_SESSION_KEY);
  if (!token) return null;
  try {
    const { payload } = await jose.jwtVerify(token.value, KEY);
    return payload;
  } catch (e) {
    return null;
  }
};

export const authenticate = async (user: User) => {
  const payload = {
    userId: user.id,
    role: user.role,
  };
  const alg = "HS256";
  const cookiesStore = cookies();
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(process.env.BASE_URL as string)
    .setExpirationTime("4h")
    .sign(KEY);
    console.log("jwt :",jwt)
  cookiesStore.set(USER_SESSION_KEY, jwt, {
    path: "/",
    secure: false, //process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 14400,
  });
  const next = cookiesStore.get("_NEXT_AUTH_URL");
  //console.log("next : ", next)
  if (next) {
    cookiesStore.delete("_NEXT_AUTH_URL");
    return next.value;
  }
  return null;
};

export const clearSession = async () => {
  const cookiesStore = cookies();
  cookiesStore.delete(USER_SESSION_KEY);
};

export const getUserFromSession = async (token: RequestCookie | undefined) => {
  const session = await getSession(token);
  if (!session) return null;
  return findUserById(session.userId as string);
};


export const requireUser = async (token: RequestCookie | undefined) => {
  const user = await getUserFromSession(token);
  //console.log(user)
  if (!user) {
    redirect("/auth/login");
  }

  // if (["INDIVIDUAL", "ENTERPRISE"].includes(user.role)) {
  //   redirect("/dashboard");
  // }

  // if (["STAFF", "ADMIN"].includes(user.role)) {
  //   redirect("/backofiice");
  // }
  return user;
};
