"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { login } from "@/services/auth.service";

const Index = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login({
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      });

      router.push("/dashboard");
    } catch (error: any) {
      // console.log(error);
      if (error?.errors) {
        const errors = Object.values(error.errors) as string[][];
        toast.error(errors[0][0]);
      } else {
        toast.error(error.message);
      }
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
          onSubmit={handleSubmit}
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
              type="text"
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
