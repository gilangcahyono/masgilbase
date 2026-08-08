import Link from "next/link";
import Script from "next/script";

const Index = () => {
  return (
    <div>
      <input type="checkbox" id="nav-toggle" className="peer sr-only" />

      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link className="block text-indigo-600" href="/">
            <span className="sr-only">Home</span>
            <span className="grid h-12 w-32 place-content-center rounded-lg bg-gray-100 text-sm text-indigo-500">
              Masgilbase
            </span>
          </Link>

          <div className="flex flex-1 gap-6 items-center justify-end xmd:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    {" "}
                    Home{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/products"
                  >
                    {" "}
                    Products{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/docs"
                  >
                    {" "}
                    Docs{" "}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Link
                  className="xhidden rounded-md bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600 sm:block"
                  href="/login"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <Script>
        {`
        const navToggleCheckbox = document.getElementById('nav-toggle')
        const navToggleLabel = document.getElementById('nav-toggle-label')

        navToggleCheckbox.addEventListener('change', () => {
          navToggleLabel.setAttribute('aria-expanded', String(navToggleCheckbox.checked))
        })
        `}
      </Script> */}
    </div>
  );
};

export default Index;
