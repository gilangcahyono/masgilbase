import Layout from "@/components/Layout";
import { User } from "@/interface/jwt";
import { jwtDecode } from "jwt-decode";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

const Index = ({ token }: { token: string }) => {
  const [key, setKey] = useState<string>();
  const [showKey, setShowKey] = useState<boolean>(false);
  const [user, setUser] = useState<any>();

  const getApiKey = async () => {
    const res = await fetch("/api/files/key", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setKey(data.key);
  };

  const handleShowKey = () => {
    setShowKey((prev) => !prev);
  };

  const editProfile = () => {
    console.log("edit profile");
  };

  useEffect(() => {
    // getApiKey();
    // const token = localStorage.getItem("token_info");
    // if (token) {
    //   const decoded: User = jwtDecode(token);
    //   setUser(decoded);
    // }
  }, []);
  return (
    <Layout>
      <div className="w-full rounded-lg border border-gray-200 bg-white p-6 mb-3">
        <h2 className="font-semibold text-gray-900">API Key</h2>

        <div className="mt-4 overflow-auto">
          <button
            onClick={handleShowKey}
            className="block mb-3 rounded-lg border border-indigo-600 bg-indigo-600 px-7 py-2 font-medium text-white transition-colors hover:bg-transparent hover:text-indigo-600"
          >
            {showKey ? "Hide Key" : "Show Key"}
          </button>
          {showKey && (
            <span className="inline-block p-2 bg-gray-200 rounded">{key}</span>
          )}
        </div>
      </div>

      <div className="w-full rounded-lg border border-gray-200 bg-white p-6 mb-3">
        <h2 className="font-semibold text-gray-900">Profile</h2>

        <div className="mt-4">
          <form onSubmit={editProfile} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-900"
                htmlFor="name"
              >
                Name
              </label>

              <input
                className="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none"
                id="name"
                name="name"
                defaultValue={user?.name}
                type="text"
                required
              />
            </div>

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
                defaultValue={user?.email}
                type="email"
                required
                disabled
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-900"
                htmlFor="newPassword"
              >
                New Password
              </label>

              <input
                className="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none"
                id="newPassword"
                name="newPassword"
                type="password"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-900"
                htmlFor="curretPassword"
              >
                Current Password
              </label>

              <input
                className="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none"
                id="curretPassword"
                name="curretPassword"
                type="password"
                required
              />
            </div>

            <button
              className="block w-full rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 font-medium text-white transition-colors hover:bg-transparent hover:text-indigo-600"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token;

  return {
    props: {
      token: token ?? null,
    },
  };
};
