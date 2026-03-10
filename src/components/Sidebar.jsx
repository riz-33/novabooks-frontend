import { Link } from "react-router-dom";
import Logo from "../assets/logo6.png";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen  text-black p-6">
      {/* <div className="flex items-center mb-8"> */}
        <img alt="NovaBooks Logo" src={Logo} className="h-25 w-100 mr-3" />
        {/* <h1 className="text-2xl font-bold">NovaBooks</h1> */}
      {/* </div> */}

      <nav className="flex flex-col gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/accounts">Accounts</Link>
        <Link to="/transactions">Transactions</Link>
      </nav>
    </div>
  );
}
