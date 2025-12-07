import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
    </div>

  );
};

export default MainLayout;
