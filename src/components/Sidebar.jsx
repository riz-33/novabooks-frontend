import { Link } from "react-router-dom";
import Logo from "../assets/logo6.png";
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Wallet,
} from "lucide-react";

export default function Sidebar() {
  return (
    <nav className="w-20 border-r bg-white flex flex-col items-center py-6 gap-8 shadow-sm">
      <Link to="/dashboard">
        <LayoutDashboard className="text-blue-900 cursor-pointer" />
      </Link>
      <Link to="/ledger">
        <FileText className="text-gray-400 cursor-pointer hover:text-blue-900" />
      </Link>
      <Link to="/accounts">
        <Wallet className="text-gray-400 cursor-pointer hover:text-blue-900" />
      </Link>
      <Link to="/profile">
        <Briefcase className="text-gray-400 cursor-pointer hover:text-blue-900" />
      </Link>
      <Link to="/settings">
        <Settings className="text-gray-400 mt-auto cursor-pointer" />
      </Link>
      <Link to="/logout">
        <LogOut className="text-gray-400 cursor-pointer" />
      </Link>
    </nav>
    // <nav className="flex flex-col gap-4">
    //   <Link to="/dashboard">Dashboard</Link>
    //   <Link to="/accounts">Accounts</Link>
    //   <Link to="/transactions">Transactions</Link>
    // </nav>
  );
}
