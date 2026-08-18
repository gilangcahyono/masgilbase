export const request = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  options: any = {},
) => {
  const res = await fetch(url, {
    method,
    ...options,
  });

  const result = await res.json();
  console.log(result);

  if (!res.ok) {
    return {
      data: null,
      error: result.error,
    };
  }

  return {
    data: result,
    error: null,
  };
};
