import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

const Navbar = () => {
  const [user, setUser] = useState<User | null>();
  const router = useRouter();

  useEffect(() => {
    // const token = localStorage.getItem("token_info");
    // if (token) {
    //   const decoded: User = jwtDecode(token);
    //   setUser(decoded);
    // }
  }, []);

  const logout = async (e: any) => {
    await fetch("/api/logout", {
      method: "DELETE",
    });
    localStorage.removeItem("token_info");
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-b-gray-200">
      <div className="mx-auto max-w-7xl px-6 xsm:px-6 xlg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-indigo-600" href="#">
              <span className="sr-only">Home</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
              </svg>
            </a>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <div className="hidden md:relative md:block">
              <button
                type="button"
                className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
              >
                <span className="sr-only">Toggle dashboard menu</span>

                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1160"
                  alt=""
                  className="size-10 object-cover"
                />
              </button>

              <div
                className="absolute inset-e-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg xhidden"
                role="menu"
              >
                <div className="p-2">
                  <div className="block rounded-lg px-4 py-2 text-gray-500 ">
                    <span className="block font-semibold">{user?.name}</span>
                    <span className="block text-xs">{user?.email}</span>
                  </div>
                </div>
                <div className="p-2">
                  <Link
                    href="/dashboard/settings"
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    role="menuitem"
                  >
                    Settings
                  </Link>
                </div>

                <div className="p-2">
                  <button
                    onClick={logout}
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    role="menuitem"
                  >
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>

            <div className="block md:hidden">
              <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <span className="sr-only">Toggle menu</span>

                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
