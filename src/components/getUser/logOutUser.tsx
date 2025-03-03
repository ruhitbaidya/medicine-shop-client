"use server";
import { cookies } from "next/headers";

export const Logout = async () => {
  const cookie = cookies();
  (await cookie).delete("authToken");
};
