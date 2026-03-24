import React, { useState } from "react";
import {
  X,
  Landmark,
  ShieldCheck,
  PieChart,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ACCOUNT_TYPES = [
  {
    label: "Asset",
    value: "Asset",
    icon: Landmark,
    description: "Cash, Bank, Inventory, Property",
  },
  {
    label: "Liability",
    value: "Liability",
    icon: ShieldCheck,
    description: "Loans, Credit Cards, Accounts Payable",
  },
  {
    label: "Equity",
    value: "Equity",
    icon: PieChart,
    description: "Owner's Capital, Retained Earnings",
  },
  {
    label: "Income",
    value: "Income",
    icon: TrendingUp,
    description: "Sales, Service Revenue, Interest",
  },
  {
    label: "Expense",
    value: "Expense",
    icon: TrendingDown,
    description: "Rent, Salaries, Utilities",
  },
];

export default function CreateAccountModal({
  isOpen,
  onClose,
  onAccountCreated,
}) {
  const [formData, setFormData] = useState({
    name: "",
    type: "Asset",
    balance: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/accounts", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      toast.success("Account created successfully!");
      onAccountCreated(response.data); // Refresh the list in parent
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating account");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-novaNavy/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-black text-novaNavy">
            Create New Account
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Account Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
              Account Name
            </label>
            <input
              required
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-lg font-bold text-novaNavy focus:ring-2 focus:ring-novaGold outline-none transition-all"
              placeholder="e.g. Main Business Checking"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* Account Type Grid */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
              Account Category
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ACCOUNT_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type.value })}
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                    formData.type === type.value
                      ? "border-novaNavy bg-novaNavy/5 shadow-md"
                      : "border-gray-50 bg-gray-50/50 hover:border-gray-200"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${formData.type === type.value ? "bg-novaNavy text-white" : "bg-white text-gray-400"}`}
                  >
                    <type.icon size={20} />
                  </div>
                  <div>
                    <p
                      className={`font-black text-sm ${formData.type === type.value ? "text-novaNavy" : "text-gray-500"}`}
                    >
                      {type.label}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium leading-tight">
                      {type.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 font-bold text-gray-400 hover:text-gray-600 transition-all"
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting}
              className="flex-[2] py-4 bg-novaNavy text-white font-black rounded-2xl shadow-xl shadow-novaNavy/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "ADD ACCOUNT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
