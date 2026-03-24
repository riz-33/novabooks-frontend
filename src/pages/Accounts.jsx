import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Landmark,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import CreateAccountModal from "../components/AddNewAccount";

export default function Accounts() {
  const [loading, setLoading] = useState(true);
  // 1. Ensure initial state is always an empty array
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get("/api/accounts", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        // 2. Check if the response is actually an array
        // If your backend sends { accounts: [...] }, use res.data.accounts
        if (Array.isArray(res.data)) {
          setAccounts(res.data);
        } else if (res.data && Array.isArray(res.data.accounts)) {
          setAccounts(res.data.accounts);
        } else {
          console.error("API did not return an array:", res.data);
          setAccounts([]); // Fallback to empty array to prevent crash
        }
      } catch (err) {
        console.error("Failed to load accounts", err);
        setAccounts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  // 3. Add a "Guard" before filtering to prevent the crash
  const safeAccounts = Array.isArray(accounts) ? accounts : [];

  const totalAssets = safeAccounts
    .filter((a) => a.type === "Asset")
    .reduce((s, a) => s + (a.balance || 0), 0);

  const totalLiabilities = safeAccounts
    .filter((a) => a.type === "Liability")
    .reduce((s, a) => s + (a.balance || 0), 0);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleAccountCreated = (newAccount) => {
    setAccounts((prev) => [...prev, newAccount]);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-novaNavy">
            Chart of Accounts
          </h1>
          <p className="text-gray-500 font-medium">
            Manage your financial structure and real-time balances.
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-novaGold text-novaNavy font-black px-6 py-3 rounded-2xl shadow-lg shadow-novaGold/20 hover:scale-105 transition-all flex items-center gap-2"
        >
          <Plus size={20} /> NEW ACCOUNT
        </button>
        <CreateAccountModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onAccountCreated={handleAccountCreated}
        />
      </header>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <SummaryCard
          title="Total Assets"
          amount={totalAssets}
          icon={Landmark}
          color="text-emerald-600"
        />
        <SummaryCard
          title="Total Liabilities"
          amount={totalLiabilities}
          icon={ArrowDownLeft}
          color="text-rose-600"
        />
        <SummaryCard
          title="Equity"
          amount={totalAssets - totalLiabilities}
          icon={ArrowUpRight}
          color="text-novaNavy"
        />
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Account Name
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Type
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Balance
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {accounts.map((acc) => (
              <tr
                key={acc._id}
                className="hover:bg-gray-50/30 transition-colors group"
              >
                <td className="px-8 py-6">
                  <span className="font-bold text-novaNavy text-lg">
                    {acc.name}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border ${getTypeStyles(acc.type)}`}
                  >
                    {acc.type}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span className="font-black text-novaNavy text-xl">
                    $
                    {acc.balance.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="text-gray-300 hover:text-novaNavy transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SummaryCard({ title, amount, icon: Icon, color }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 rounded-2xl text-novaNavy">
          <Icon size={24} />
        </div>
      </div>
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
        {title}
      </p>
      <h2 className={`text-3xl font-black ${color}`}>
        ${amount.toLocaleString()}
      </h2>
    </div>
  );
}

function getTypeStyles(type) {
  const styles = {
    Asset: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Liability: "bg-rose-50 text-rose-600 border-rose-100",
    Equity: "bg-novaNavy text-white border-novaNavy",
    Income: "bg-novaGold/10 text-novaGold border-novaGold/20",
    Expense: "bg-gray-100 text-gray-600 border-gray-200",
  };
  return styles[type] || "";
}
