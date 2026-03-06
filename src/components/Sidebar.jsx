import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">NovaBooks</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/accounts">Accounts</Link>
        <Link to="/transactions">Transactions</Link>
      </nav>
    </div>
  );
}