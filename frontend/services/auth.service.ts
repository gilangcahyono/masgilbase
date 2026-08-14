export const login = async (payload: { email: string; password: string }) => {
  const host = process.env.NEXT_PUBLIC_API_HOST;
  const res = await fetch(`${host}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};

export const register = async (payload: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const host = process.env.NEXT_PUBLIC_API_HOST;
  const res = await fetch(`${host}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
