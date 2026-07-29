import { TokenPayload } from "@/interfaces/jwt";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

const Index = () => {
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    console.log(data);
    // if (data.success) {
    // window.localStorage.setItem("token", data.token);
    // const token: TokenPayload = jwtDecode<TokenPayload>(data.token);
    // window.location.href = "/dashboard";
    // }
  };

  return (
    <div className="p-4">
      <Link
        href="/"
        className=" grid h-12 w-32 place-content-center rounded-lg bg-gray-100 text-sm text-gray-500"
      >
        Masgilbase
      </Link>
      <br />

      <div className="h-fit flex items-center">
        <form
          onSubmit={login}
          className="mx-auto w-sm space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6"
        >
          <h1 className="text-center text-3xl text-indigo-900 font-semibold">
            Register
          </h1>

          <div>
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>

            <input
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none"
              id="email"
              name="email"
              type="email"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>

            <input
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none"
              id="password"
              name="password"
              type="password"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="password"
            >
              Confirm Password
            </label>

            <input
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
            />
          </div>

          <button
            className="block w-full rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 font-medium text-white transition-colors hover:bg-transparent hover:text-indigo-600"
            type="submit"
          >
            Register
          </button>
          <p className="text-center">
            <span>Already have an account? </span>
            <Link className="text-indigo-600 font-semibold" href="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Index;
