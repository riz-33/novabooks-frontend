import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logo from "../assets/logo2.png";
import {
  Menu,
  X,
  LayoutDashboard,
  BookOpen,
  User,
  LogOut,
  Bell,
} from "lucide-react"; // Lightweight icons

export default function Navbar() {
  const { user, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="flex-shrink-0 flex items-center gap-2"
            >
              <img className="h-15 w-25" src={Logo} alt="NovaBooks" />
              <span className="text-xl font-black text-novaNavy tracking-tighter hidden sm:block">
                NOVABOOKS
              </span>
            </Link>
          </div>

          {user && (
            <div className="hidden md:flex items-center space-x-8">
              <NavLink
                to="/dashboard"
                icon={<LayoutDashboard size={18} />}
                label="Dashboard"
              />
              <NavLink
                to="/ledger"
                icon={<BookOpen size={18} />}
                label="Ledger"
              />
              <NavLink
                to="/profile"
                icon={<User size={18} />}
                label="Account"
              />
            </div>
          )}

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button className="cursor-pointer text-gray-400 hover:text-novaGold transition-colors">
                  <Bell size={20} />
                </button>
                <button className="cursor-pointer p-2 text-gray-400 hover:text-novaGold transition-colors">
                  <User size={20} />
                </button>

                <div className="h-8 w-[1px] bg-gray-200"></div>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-novaNavy rounded-xl hover:bg-blue-900 transition-all shadow-md active:scale-95"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="text-sm font-bold text-novaNavy hover:text-novaGold transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-bold text-white bg-novaNavy rounded-xl shadow-lg hover:shadow-novaNavy/20 transition-all active:scale-95"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-novaNavy p-2 rounded-lg hover:bg-gray-50"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-xl">
          {user ? (
            <>
              <MobileNavLink
                to="/dashboard"
                label="Dashboard"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                to="/ledger"
                label="Ledger"
                onClick={() => setIsOpen(false)}
              />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 font-bold bg-red-50 rounded-xl"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                className="w-full text-center py-3 font-bold text-novaNavy"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full text-center py-3 font-bold bg-novaNavy text-white rounded-xl"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

// Sub-components for cleaner code
function NavLink({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-novaNavy transition-colors group"
    >
      <span className="text-gray-400 group-hover:text-novaGold transition-colors">
        {icon}
      </span>
      {label}
    </Link>
  );
}

function MobileNavLink({ to, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-3 text-base font-bold text-novaNavy hover:bg-gray-50 rounded-xl"
    >
      {label}
    </Link>
  );
}
