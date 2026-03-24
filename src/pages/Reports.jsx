import React, { useState, useEffect } from "react";
import axios from "axios";
import { Printer, FileDown, ChevronRight, Landmark } from "lucide-react";

export default function Reports() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalanceSheet = async () => {
      try {
        const res = await axios.get("/api/accounts", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setAccounts(
          Array.isArray(res.data) ? res.data : res.data.accounts || [],
        );
      } catch (err) {
        console.error("Report fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBalanceSheet();
  }, []);

  // Categorizing Data
  const assets = accounts.filter((a) => a.type === "Asset");
  const liabilities = accounts.filter((a) => a.type === "Liability");
  const equity = accounts.filter((a) => a.type === "Equity");

  const totalAssets = assets.reduce((sum, a) => sum + a.balance, 0);
  const totalLiabilities = liabilities.reduce((sum, a) => sum + a.balance, 0);
  const totalEquity = equity.reduce((sum, a) => sum + a.balance, 0);

  if (loading)
    return (
      <div className="p-20 text-center font-bold text-novaNavy">
        Calculating Ledger...
      </div>
    );

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Report Header */}
      <div className="flex justify-between items-start mb-12 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-black text-novaNavy mb-2">
            Balance Sheet
          </h1>
          <p className="text-gray-500 font-medium uppercase text-xs tracking-[0.2em]">
            As of{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-3 no-print">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
          >
            <Printer size={18} /> Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-novaNavy text-white rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg">
            <FileDown size={18} /> PDF
          </button>
        </div>
      </div>

      <div className="space-y-12 bg-white p-12 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-50">
        {/* ASSETS SECTION */}
        <section>
          <div className="flex items-center justify-between mb-6 border-b-2 border-novaNavy/10 pb-2">
            <h2 className="text-xl font-black text-novaNavy uppercase tracking-tighter">
              Assets
            </h2>
            <Landmark size={20} className="text-novaGold" />
          </div>
          <div className="space-y-4">
            {assets.map((acc) => (
              <ReportLine key={acc._id} label={acc.name} amount={acc.balance} />
            ))}
            <TotalLine label="Total Assets" amount={totalAssets} isGrandTotal />
          </div>
        </section>

        {/* LIABILITIES SECTION */}
        <section>
          <div className="flex items-center justify-between mb-6 border-b-2 border-novaNavy/10 pb-2">
            <h2 className="text-xl font-black text-novaNavy uppercase tracking-tighter">
              Liabilities
            </h2>
          </div>
          <div className="space-y-4">
            {liabilities.map((acc) => (
              <ReportLine key={acc._id} label={acc.name} amount={acc.balance} />
            ))}
            <TotalLine label="Total Liabilities" amount={totalLiabilities} />
          </div>
        </section>

        {/* EQUITY SECTION */}
        <section>
          <div className="flex items-center justify-between mb-6 border-b-2 border-novaNavy/10 pb-2">
            <h2 className="text-xl font-black text-novaNavy uppercase tracking-tighter">
              Equity
            </h2>
          </div>
          <div className="space-y-4">
            {equity.map((acc) => (
              <ReportLine key={acc._id} label={acc.name} amount={acc.balance} />
            ))}
            <TotalLine label="Total Equity" amount={totalEquity} />
          </div>
        </section>

        {/* FINAL BALANCE CHECK */}
        <div className="mt-16 p-8 bg-gray-50 rounded-[2rem] border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Total Liabilities & Equity
            </p>
            <h3 className="text-3xl font-black text-novaNavy">
              ${(totalLiabilities + totalEquity).toLocaleString()}
            </h3>
          </div>
          <div
            className={`px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest ${
              totalAssets === totalLiabilities + totalEquity
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700 animate-pulse"
            }`}
          >
            {totalAssets === totalLiabilities + totalEquity
              ? "Balanced"
              : "Unbalanced"}
          </div>
        </div>
      </div>
    </div>
  );
}

const ReportLine = ({ label, amount }) => (
  <div className="flex justify-between items-center group">
    <div className="flex items-center gap-2">
      <ChevronRight
        size={14}
        className="text-gray-300 group-hover:text-novaGold transition-colors"
      />
      <span className="text-gray-600 font-medium">{label}</span>
    </div>
    <span className="font-bold text-novaNavy">
      ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
    </span>
  </div>
);

const TotalLine = ({ label, amount, isGrandTotal }) => (
  <div
    className={`flex justify-between items-center pt-4 mt-2 border-t border-gray-100 ${isGrandTotal ? "text-novaNavy" : "text-gray-700"}`}
  >
    <span className="font-black uppercase text-xs tracking-widest">
      {label}
    </span>
    <span
      className={`font-black text-lg ${isGrandTotal ? "underline decoration-novaGold decoration-4 underline-offset-8" : ""}`}
    >
      ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
    </span>
  </div>
);
