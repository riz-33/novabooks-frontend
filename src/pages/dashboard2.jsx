import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { FileText, Plus, ArrowUpRight, TrendingUp } from "lucide-react";
import axios from "axios";

// Using your exact brand hex codes
const COLORS = ["#1e3a8a", "#d4af37", "#9ca3af", "#374151"]; 

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("/api/accounts", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setAccounts(Array.isArray(res.data) ? res.data : res.data.accounts || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Real-time calculations from your schema
  const totalAssets = accounts.filter(a => a.type === "Asset").reduce((s, a) => s + a.balance, 0);
  const totalIncome = accounts.filter(a => a.type === "Income").reduce((s, a) => s + a.balance, 0);
  const totalExpenses = accounts.filter(a => a.type === "Expense").reduce((s, a) => s + a.balance, 0);
  const netProfit = totalIncome - totalExpenses;

  // Formatting for the Pie Chart based on real account types
  const pieData = accounts.length > 0 ? [
    { name: "Assets", value: totalAssets },
    { name: "Income", value: totalIncome },
    { name: "Expenses", value: totalExpenses },
  ] : [{ name: "No Data", value: 1 }];

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black text-novaNavy tracking-tight">Financial Overview</h1>
          <p className="text-novaGold font-bold flex items-center gap-2 uppercase text-xs tracking-widest mt-1">
            <TrendingUp size={14} /> Real-time Double-Entry Ledger
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-gray-400 text-[10px] font-black uppercase">Last Updated</p>
          <p className="font-bold text-novaNavy">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Net Profit" amount={netProfit} trend="+8.2%" isPositive={netProfit >= 0} />
        <StatCard title="Total Assets" amount={totalAssets} trend="+12%" isPositive={true} />
        <StatCard title="Op. Expenses" amount={totalExpenses} trend="-2%" isPositive={false} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cash Flow Bar Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-novaNavy uppercase text-sm tracking-wider">Revenue vs Expenses</h3>
            <select className="bg-gray-50 border-none text-xs font-bold rounded-lg px-3 py-1 outline-none text-gray-500">
              <option>Last 6 Months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={dummyBarData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af", fontWeight: 600 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <Tooltip 
                cursor={{ fill: "#f9fafb" }} 
                contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}
              />
              <Bar dataKey="revenue" fill="#1e3a8a" radius={[10, 10, 0, 0]} barSize={32} />
              <Bar dataKey="expense" fill="#d4af37" radius={[10, 10, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown & Quick Actions */}
        <div className="space-y-8">
          {/* Pie Chart Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="font-black text-novaNavy uppercase text-sm tracking-wider mb-4">Capital Allocation</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={10} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
               {pieData.map((entry, i) => (
                 <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} /> {entry.name}
                 </div>
               ))}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-novaNavy p-8 rounded-[2.5rem] shadow-xl shadow-novaNavy/20 text-white">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <ArrowUpRight size={20} className="text-novaGold" /> Quick Entry
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10 group">
                <Plus size={20} className="text-novaGold group-hover:scale-125 transition-transform" />
                <span className="text-[10px] font-bold mt-2 uppercase tracking-tight">Income</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10 group">
                <FileText size={20} className="text-white group-hover:scale-125 transition-transform" />
                <span className="text-[10px] font-bold mt-2 uppercase tracking-tight">Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card
const StatCard = ({ title, amount, trend, isPositive }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3">{title}</p>
    <div className="flex items-end justify-between">
      <h2 className="text-3xl font-black text-novaNavy tracking-tighter">${amount.toLocaleString()}</h2>
      <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {trend}
      </span>
    </div>
  </div>
);

const dummyBarData = [
  { name: "Jan", revenue: 4000, expense: 2400 },
  { name: "Feb", revenue: 3000, expense: 1398 },
  { name: "Mar", revenue: 2000, expense: 9800 },
  { name: "Apr", revenue: 2780, expense: 3908 },
  { name: "May", revenue: 1890, expense: 4800 },
  { name: "Jun", revenue: 2390, expense: 3800 },
];

export default Dashboard;