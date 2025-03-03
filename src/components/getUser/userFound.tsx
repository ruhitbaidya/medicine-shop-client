/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
type TUserIn = {
  email: string;
  role: string;
};
export const getUser = async () => {
  const cookier = cookies();
  const cookie = (await cookier).get("authToken");
  if (!cookie) {
    throw new Error("No auth token found");
  }

  try {
    const user = jwtDecode<TUserIn>(cookie.value);
    return user;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
