import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { LoginPayload, LoginResponse } from "../api/login";

const Index = () => {
  const router = useRouter();
  const login = async (e: any) => {
    e.preventDefault();
    const payload: LoginPayload = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data: LoginResponse = await res.json();
    if (!data.success) {
      if (typeof data.message === "string") {
        toast.error(data.message);
      } else {
        const errors = Object.values(data.message);
        toast.error(errors[0][0]);
      }
    } else {
      localStorage.setItem("token_info", data.token!);
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-4">
      <Link
        href="/"
        className=" grid h-12 w-32 place-content-center rounded-lg bg-gray-100 text-sm text-orange-500"
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
            Login
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
              type="password"
              required
            />
          </div>

          <button
            className="block w-full rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 font-medium text-white transition-colors hover:bg-transparent hover:text-indigo-600"
            type="submit"
          >
            Login
          </button>
          <p className="text-center">
            <span>Don&apos;t have an account? </span>
            <Link className="text-indigo-600 font-semibold" href="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Index;
