export const postApi = async (
  url: string,
  data: { email: string; phone?: string; password: string }
) => {
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
