import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="absolute top-0 left-0 right-0 min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4 flex gap-4">
        <div className="w-full rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-gray-900">Your Projects</h2>
          <div className="mt-4 flex gap-4 flex-wrap">
            <div className="border border-gray-200 px-6 py-4 rounded-md hover:bg-gray-50 cursor-pointer">
              <h3>GeprekIn</h3>
              <div className="text-xs text-gray-500">
                <span>Auth : 3 User</span>
                <br />
                <span>Storage : 74 MB</span>
              </div>
            </div>
            <div className="border border-gray-200 px-6 py-4 rounded-md hover:bg-gray-50 cursor-pointer">
              <h3>Penyetan CakUus</h3>
              <div className="text-xs text-gray-500">
                <span>Auth : 3 User</span>
                <br />
                <span>Storage : 74 MB</span>
              </div>
            </div>
            <div className="border border-gray-200 px-6 py-4 rounded-md hover:bg-gray-50 cursor-pointer">
              <h3>Tugas MDP</h3>
              <div className="text-xs text-gray-500">
                <span>Auth : 6 User</span>
                <br />
                <span>Storage : 48 MB</span>
              </div>
            </div>
            <div className="border border-gray-200 px-6 py-4 rounded-md hover:bg-gray-50 cursor-pointer">
              <h3>PALM</h3>
              <div className="text-xs text-gray-500">
                <span>Auth : 1 User</span>
                <br />
                <span>Storage : 39 MB</span>
              </div>
            </div>
            <div className="border border-gray-200 px-6 py-4 rounded-md hover:bg-gray-50 cursor-pointer">
              <h3>Teknisi KLA</h3>
              <div className="text-xs text-gray-500">
                <span>Auth : 30 User</span>
                <br />
                <span>Storage : 140 MB</span>
              </div>
            </div>
            <div className="border border-gray-200 px-6 py-4 rounded-md hover:bg-gray-50 cursor-pointer">
              <h3>Masgil Blog</h3>
              <div className="text-xs text-gray-500">
                <span>Auth : 19 User</span>
                <br />
                <span>Storage : 32 MB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-xl h-fit rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-gray-900">Resources usage</h2>
          <div className="mt-4">
            <ul className="text-sm">
              <li className="border-b border-b-gray-300 mb-3">
                AUTH USER{" "}
                <span className="float-end">
                  <span className="font-semibold">76</span> / 1000
                </span>
              </li>
              <li className="border-b border-b-gray-300 mb-3">
                FILE STORAGE{" "}
                <span className="float-end">
                  <span className="font-semibold">0.3 GB</span> / 1 GB
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
