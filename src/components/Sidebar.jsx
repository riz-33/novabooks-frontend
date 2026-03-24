import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Wallet,
} from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function Sidebar() {
  const [loading, setLoading] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setLoading(true);
    logout();
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-20 border-r border-gray-100 bg-white flex flex-col items-center py-8 gap-4 shadow-sm h-full">
      <SidebarIcon
        to="/dashboard"
        icon={<LayoutDashboard size={24} />}
        active={isActive("/dashboard")}
        label="Dashboard"
      />

      <SidebarIcon
        to="/ledger"
        icon={<FileText size={24} />}
        active={isActive("/ledger")}
        label="Ledger"
      />

      <SidebarIcon
        to="/accounts"
        icon={<Wallet size={24} />}
        active={isActive("/accounts")}
        label="Accounts"
      />

      <SidebarIcon
        to="/profile"
        icon={<Briefcase size={24} />}
        active={isActive("/profile")}
        label="Business Profile"
      />

      <div className="mt-auto flex flex-col items-center gap-4">
        <SidebarIcon
          to="/settings"
          icon={<Settings size={24} />}
          active={isActive("/settings")}
          label="Settings"
        />

        <button
          // to="/logout"
          title="Logout"
          onClick={handleLogout}
          disabled={loading}
          className="cursor-pointer p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
        >
          {loading ? (
            <CircularProgress
              size={20}
              color="inherit"
            />
          ) : (
            <LogOut size={24} />
          )}
        </button>
      </div>
    </nav>
  );
}

function SidebarIcon({ to, icon, active, label }) {
  return (
    <Link
      to={to}
      title={label}
      className={`p-2 rounded-2xl transition-all duration-300 group ${
        active
          ? "bg-novaNavy text-white shadow-lg shadow-novaNavy/20 scale-110"
          : "text-gray-400 hover:text-novaNavy hover:bg-gray-50"
      }`}
    >
      <div className="relative">
        {icon}
        {active && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-novaGold rounded-full border-2 border-novaNavy" />
        )}
      </div>
    </Link>
  );
}
