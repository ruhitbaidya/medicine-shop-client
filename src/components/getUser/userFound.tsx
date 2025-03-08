/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { TUserIn } from "@/app/types/medicinestype";

export const getUser = async () => {
  const cookier = cookies();
  const cookie = (await cookier).get("authToken");

  if (cookie) {
    try {
      const user = jwtDecode<TUserIn | null>(cookie.value);
      return user;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
};
