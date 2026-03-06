import { useEffect, useState } from "react";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const { data } = await api.get("/accounts");
    setAccounts(data);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-8 w-full">
        <h2 className="text-2xl font-bold mb-6">Accounts</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc) => (
              <tr key={acc._id}>
                <td className="p-2 border">{acc.name}</td>
                <td className="p-2 border">{acc.type}</td>
                <td className="p-2 border font-semibold">
                  {acc.balance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}