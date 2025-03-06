/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getToken = async () => {
  const cookier = cookies();
  const token = (await cookier).get("authToken")?.value;
  return token;
};
export const postApi = async (url: string, data: any) => {
  const token = await getToken();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      credentials: "include",
    },
    body: JSON.stringify(data),
  });
  const result = res.json();
  return result;
};

export const getApi = async (url: string) => {
  const token = await getToken();
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      credentials: "include",
    },
    cache: "no-store",
  });
  const result = await res.json();
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const patchApi = async (url: string, data: any) => {
  const token = await getToken();
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      credentials: "include",
    },
    body: JSON.stringify(data),
  });
  const result = res.json();
  return result;
};

export const deleteApi = async (url: string) => {
  const token = await getToken();
  const res = await fetch(url, {
    headers: {
      "content-type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      credentials: "include",
    },
    method: "DELETE",
    cache: "no-store",
  });
  const result = res.json();
  return result;
};
