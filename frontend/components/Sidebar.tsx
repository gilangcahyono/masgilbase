import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-screen w-72 border-e border-gray-200 bg-white fixed left-0 z-50">
      <div className="p-4">
        <Link
          href="/dashboard"
          className="grid h-12 w-32 place-content-center rounded-lg bg-gray-100 text-sm text-gray-500"
        >
          Masgilbase
        </Link>
        <ul className="mt-4 space-y-1">
          <li>
            <Link
              href="/dashboard"
              className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/files"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              Files
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/docs"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              Docs
            </Link>
          </li>
          {/* <li>
            <Link
              href="/dashboard/users"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              Users
            </Link>
          </li> */}
          {/* <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900">
                Account
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <Link
                    href="/dashboard/account/settings"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    Settings
                  </Link>
                </li>

                <li>
                  <Link
                    href="/login"
                    className="block w-full rounded-lg px-4 py-2 [text-align:inherit] text-sm font-medium text-red-500 opacity-80 hover:bg-gray-100 hover:text-red-700"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </details>
          </li> */}
        </ul>
      </div>
      {/* <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a
          href="#"
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50 hover:transition-colors"
        >
          <img
            alt=""
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&q=80&w=1160"
            className="size-10 rounded-full object-cover"
          />

          <p className="text-xs text-gray-900">
            <strong className="block font-medium">Eric Frusciante</strong>

            <span> eric@frusciante.com </span>
          </p>
        </a>
      </div> */}
    </div>
  );
};

export default Sidebar;
