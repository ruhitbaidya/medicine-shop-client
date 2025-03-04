// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postApi = async (url: string, data: any) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = res.json();
  return result;
};

export const getApi = async (url: string) => {
  const res = await fetch(url);
  const result = res.json();
  return result;
};
