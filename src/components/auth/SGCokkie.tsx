"use server";
import { cookies } from "next/headers";
export const setCookie = async (token: string) => {
  const cookie = cookies();
  (await cookie).set("authToken", token);
};
