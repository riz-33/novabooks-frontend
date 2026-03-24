import React, { useState } from "react";
import { X, Plus, Trash2, AlertCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AddJournalEntryModal({ isOpen, onClose, accounts }) {
  // Each entry starts with two lines (a Debit and a Credit)
  const [lines, setLines] = useState([
    { accountId: "", type: "Debit", amount: 0 },
    { accountId: "", type: "Credit", amount: 0 },
  ]);
  const [description, setDescription] = useState("");

  // Logic to check if Debits === Credits
  const totalDebit = lines
    .filter((l) => l.type === "Debit")
    .reduce((s, l) => s + parseFloat(l.amount || 0), 0);
  const totalCredit = lines
    .filter((l) => l.type === "Credit")
    .reduce((s, l) => s + parseFloat(l.amount || 0), 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  const addLine = () =>
    setLines([...lines, { accountId: "", type: "Debit", amount: 0 }]);
  const removeLine = (index) => setLines(lines.filter((_, i) => i !== index));

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Final Validation Check
    if (!isBalanced) {
      toast.error("Debits and Credits must be equal.");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter a transaction description.");
      return;
    }

    const payload = {
      description: description,
      date: new Date(), // You can also use a state-controlled date picker
      journalLines: lines.map((line) => ({
        accountId: line.accountId,
        type: line.type,
        amount: parseFloat(line.amount),
      })),
      // userId is usually handled by the backend (req.user.id) via the JWT token
    };

    try {
      setLoading(true);
      const response = await axios.post("/api/transactions", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201) {
        toast.success("Transaction posted successfully!");
        onClose(); // Close modal
        // refreshData(); // Function to reload the Ledger table
      }
    } catch (error) {
      console.error("Transaction Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to post transaction",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-novaNavy/50 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-black text-novaNavy uppercase tracking-tighter">
            New Journal Transaction
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-novaNavy"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-6">
          {/* Description */}
          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2 mb-1 block">
              Transaction Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Monthly Rent Payment or Client Invoice"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl font-bold text-novaNavy outline-none focus:ring-2 focus:ring-novaGold"
            />
          </div>

          {/* Journal Lines Table */}
          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-4 px-2 text-[10px] font-black text-gray-400 uppercase">
              <div className="col-span-5">Account</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Amount</div>
            </div>

            {lines.map((line, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 items-center animate-in slide-in-from-left-2"
              >
                <select
                  className="col-span-5 bg-gray-50 p-3 rounded-xl text-sm font-bold text-novaNavy outline-none"
                  onChange={(e) => {
                    const newLines = [...lines];
                    newLines[index].accountId = e.target.value;
                    setLines(newLines);
                  }}
                >
                  <option value="">Select Account...</option>
                  {accounts?.map((acc) => (
                    <option key={acc._id} value={acc._id}>
                      {acc.name} ({acc.type})
                    </option>
                  ))}
                </select>

                <select
                  className="col-span-3 bg-gray-50 p-3 rounded-xl text-sm font-bold text-novaNavy outline-none"
                  value={line.type}
                  onChange={(e) => {
                    const newLines = [...lines];
                    newLines[index].type = e.target.value;
                    setLines(newLines);
                  }}
                >
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </select>

                <input
                  type="number"
                  placeholder="0.00"
                  className="col-span-3 bg-gray-50 p-3 rounded-xl text-sm font-black text-novaNavy outline-none"
                  onChange={(e) => {
                    const newLines = [...lines];
                    newLines[index].amount = e.target.value;
                    setLines(newLines);
                  }}
                />

                <button
                  onClick={() => removeLine(index)}
                  className="col-span-1 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <button
              onClick={addLine}
              className="flex items-center gap-2 text-xs font-black text-novaGold hover:text-novaNavy transition-colors mt-4"
            >
              <Plus size={14} /> ADD ANOTHER LINE
            </button>
          </div>
        </div>

        {/* Footer with Balance Validation */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase">
                Total Debits
              </p>
              <p className="text-sm font-black text-novaNavy">
                ${totalDebit.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase">
                Total Credits
              </p>
              <p className="text-sm font-black text-novaNavy">
                ${totalCredit.toLocaleString()}
              </p>
            </div>
          </div>

          {!isBalanced && totalDebit > 0 && (
            <div className="flex items-center gap-2 text-rose-500 text-xs font-bold animate-pulse">
              <AlertCircle size={14} /> Unbalanced: Diff $
              {(totalDebit - totalCredit).toFixed(2)}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!isBalanced}
            className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${
              isBalanced
                ? "bg-novaNavy text-white shadow-lg hover:bg-blue-900 cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            POST TRANSACTION
          </button>
        </div>
      </div>
    </div>
  );
}
