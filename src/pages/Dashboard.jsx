import { useEffect, useState } from "react";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const res = await api.get("/dashboard");
    setData(res.data);
  };

//   if (!data) return <div>Loading...</div>;

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-8 w-full bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white shadow p-6 rounded-lg">
            <h3 className="text-gray-500">Total Accounts</h3>
            <p className="text-2xl font-bold">{data.totalAccounts}</p>
          </div>

          <div className="bg-white shadow p-6 rounded-lg">
            <h3 className="text-gray-500">Total Assets</h3>
            <p className="text-2xl font-bold">${data.totalAssets}</p>
          </div>

          <div className="bg-white shadow p-6 rounded-lg">
            <h3 className="text-gray-500">Income</h3>
            <p className="text-2xl font-bold text-green-600">
              ${data.totalIncome}
            </p>
          </div>

          <div className="bg-white shadow p-6 rounded-lg">
            <h3 className="text-gray-500">Expenses</h3>
            <p className="text-2xl font-bold text-red-600">
              ${data.totalExpenses}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
