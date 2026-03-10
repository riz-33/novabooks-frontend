import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LayoutDashboard, FileText, Wallet, Briefcase, Settings, Bell, Plus, LogOut, Search, ChevronRight } from 'lucide-react';

const COLORS = ['#1e3a8a', '#9ca3af', '#d4af37']; // Navy, Gray, Gold

const barData = [
  { name: 'Jan', revenue: 400, expense: 240 },
  { name: 'Feb', revenue: 300, expense: 139 },
  { name: 'Mar', revenue: 500, expense: 380 },
  { name: 'Apr', revenue: 600, expense: 390 },
  { name: 'May', revenue: 450, expense: 480 },
  { name: 'Jun', revenue: 700, expense: 380 },
];

const pieData = [
  { name: 'Data', value: 400 },
  { name: 'Expense', value: 300 },
  { name: 'Other', value: 300 },
];

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <nav className="w-20 border-r bg-white flex flex-col items-center py-6 gap-8 shadow-sm">
        <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">NB</div>
        <LayoutDashboard className="text-blue-900 cursor-pointer" />
        <FileText className="text-gray-400 cursor-pointer hover:text-blue-900" />
        <Wallet className="text-gray-400 cursor-pointer hover:text-blue-900" />
        <Briefcase className="text-gray-400 cursor-pointer hover:text-blue-900" />
        <Settings className="text-gray-400 mt-auto cursor-pointer" />
        <LogOut className="text-gray-400 cursor-pointer" />
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Global Top Navbar */}
        <header className="h-16 bg-white border-b px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>NovaBooks</span>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Dashboard</span>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search invoices, clients, or reports..." 
                className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-900 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm">
              New Invoice
            </button>
            <div className="relative">
                <Bell className="text-gray-500 cursor-pointer" size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
                <img src="/api/placeholder/32/32" alt="User Profile" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-gray-500 text-sm">Reviewing your modern ledger for small businesses.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border shadow-sm border-gray-100">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Total Revenue</p>
              <h2 className="text-3xl font-bold text-yellow-600">$1,519,635</h2>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm border-gray-100">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Unpaid Invoices</p>
              <h2 className="text-3xl font-bold text-blue-900">21,258</h2>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm border-gray-100">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Health Score</p>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-bold text-green-600">423</h2>
                <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded">↗ +12%</span>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-700">Monthly Cash Flow</h3>
                <select className="text-xs border-none bg-gray-100 rounded-md p-1.5 outline-none font-medium">
                  <option>Last 6 Months</option>
                  <option>Year to Date</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                  <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="revenue" fill="#1e3a8a" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="expense" fill="#d4af37" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center">
              <h3 className="font-bold text-gray-700 self-start mb-6">Expense Categories</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} innerRadius={65} outerRadius={85} paddingAngle={8} dataKey="value">
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-xs font-medium"><span className="w-2 h-2 rounded-full bg-blue-900"></span> Data</div>
                <div className="flex items-center gap-1.5 text-xs font-medium"><span className="w-2 h-2 rounded-full bg-gray-400"></span> Expense</div>
                <div className="flex items-center gap-1.5 text-xs font-medium"><span className="w-2 h-2 rounded-full bg-yellow-600"></span> Other</div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Right Sidebar: Activity Feed */}
      <aside className="w-80 border-l bg-white p-6 hidden lg:block">
        <h3 className="font-bold text-gray-800 mb-6">Recent Activity</h3>
        <div className="space-y-6">
          {[
            { label: 'Invoiced: John Doe', amount: '$360.00', time: '2 hours ago', color: 'bg-blue-50 text-blue-700' },
            { label: 'Cloud Hosting Pay', amount: '-$221.00', time: '5 hours ago', color: 'bg-yellow-50 text-yellow-700' },
            { label: 'Client Payment', amount: '$1,135.00', time: 'Yesterday', color: 'bg-green-50 text-green-700' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${item.color}`}>
                  {item.label.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 leading-none mb-1">{item.label}</p>
                  <p className="text-[11px] text-gray-400 uppercase font-bold tracking-tight">{item.time}</p>
                </div>
              </div>
              <p className={`text-sm font-bold ${item.amount.startsWith('-') ? 'text-red-500' : 'text-gray-800'}`}>
                {item.amount}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12">
          <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all group">
              <span className="text-sm font-medium text-gray-600">Add New Expense</span>
              <Plus size={16} className="text-gray-400 group-hover:text-blue-900" />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all group">
              <span className="text-sm font-medium text-gray-600">Generate Report</span>
              <FileText size={16} className="text-gray-400 group-hover:text-blue-900" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;