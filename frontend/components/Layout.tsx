import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Sidebar />
      <div className="absolute top-0 left-0 right-0 min-h-screen bg-gray-100 ms-72">
        <Navbar />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
