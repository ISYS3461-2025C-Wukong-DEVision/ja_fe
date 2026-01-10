import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/navbar/footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>

  );
};

export default MainLayout;
