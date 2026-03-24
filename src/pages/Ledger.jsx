import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Trash2,
} from "lucide-react";
import AddJournalEntryModal from "../components/AddNew";

const transactions = [
  {
    id: "INV-001",
    client: "Aria Digital",
    date: "Oct 24, 2025",
    amount: "$1,200.00",
    status: "Paid",
    type: "Income",
  },
  {
    id: "INV-002",
    client: "Cloud Services",
    date: "Oct 22, 2025",
    amount: "$250.00",
    status: "Pending",
    type: "Expense",
  },
  {
    id: "INV-003",
    client: "John Doe",
    date: "Oct 20, 2025",
    amount: "$850.00",
    status: "Overdue",
    type: "Income",
  },
  {
    id: "INV-004",
    client: "Office Rent",
    date: "Oct 15, 2025",
    amount: "$2,000.00",
    status: "Paid",
    type: "Expense",
  },
  {
    id: "INV-005",
    client: "Stripe Payout",
    date: "Oct 12, 2025",
    amount: "$4,300.00",
    status: "Paid",
    type: "Income",
  },
];

export default function Ledger() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-novaNavy">Master Ledger</h1>
            <p className="text-gray-500 font-medium">
              Track every dollar moving through your business.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm">
              <Download size={18} /> Export
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-novaNavy text-white font-black rounded-xl hover:bg-blue-900 transition-all shadow-lg active:scale-95"
            >
              + New Entry
            </button>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white p-4 rounded-[1.5rem] border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search clients, IDs or amounts..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-novaNavy transition-all outline-none text-sm font-medium"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-3 text-gray-500 hover:text-novaNavy bg-gray-50 rounded-2xl transition-all">
            <Filter size={20} />
          </button>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">
                    Transaction ID
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">
                    Client / Vendor
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">
                    Date
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">
                    Amount
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transactions.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-5 text-sm font-bold text-novaNavy">
                      {item.id}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-700">
                      {item.client}
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-gray-500">
                      {item.date}
                    </td>
                    <td
                      className={`px-6 py-5 text-sm font-black ${item.type === "Income" ? "text-emerald-600" : "text-gray-900"}`}
                    >
                      {item.type === "Income" ? "+" : "-"}
                      {item.amount}
                    </td>
                    <td className="px-6 py-5">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-novaNavy transition-colors">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddJournalEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

// Sub-component for Status Badges
function StatusBadge({ status }) {
  const styles = {
    Paid: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Pending: "bg-novaGold/10 text-novaGold border-novaGold/20",
    Overdue: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <span
      className={`px-3 py-1 text-[11px] font-black uppercase tracking-wider border rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
}
