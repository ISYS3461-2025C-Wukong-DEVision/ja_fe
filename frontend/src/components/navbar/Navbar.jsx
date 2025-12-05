import { NavLink } from "react-router-dom";
import { HomeIcon, BriefcaseIcon, BuildingOfficeIcon, BellIcon, UserCircleIcon, CreditCardIcon } from "@heroicons/react/24/outline";

const navItems = [
  { name: "Home", path: "/", icon: <HomeIcon className="w-5 h-5" /> },
  { name: "Jobs", path: "/job", icon: <BriefcaseIcon className="w-5 h-5" /> },
  { name: "Company", path: "/company", icon: <BuildingOfficeIcon className="w-5 h-5" /> },
  { name: "Subscription", path: "/subscription", icon: <CreditCardIcon className="w-5 h-5" /> },
  { name: "Notification", path: "/notification", icon: <BellIcon className="w-5 h-5" /> },
  { name: "Profile", path: "/profile", icon: <UserCircleIcon className="w-5 h-5" /> },
];

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="font-bold text-xl text-blue-600">MyApp</div>

        {/* MENU */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-1 px-2 py-1 text-sm font-medium 
                ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-black"}`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* MOBILE MENU (optional) */}
        <div className="md:hidden flex gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `p-2 ${isActive ? "text-blue-600" : "text-gray-600"}`
              }
            >
              {item.icon}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
