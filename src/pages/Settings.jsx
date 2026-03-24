import React from "react";

export default function Settings() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-black text-novaNavy mb-2">Settings</h1>
      <p className="text-gray-500 mb-8 font-medium">
        Manage your NovaBooks account and preferences.
      </p>

      <div className="space-y-6">
        {/* Profile Section */}
        <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-novaNavy mb-6">
            Business Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                Company Name
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border-gray-100 rounded-2xl p-4 text-novaNavy font-bold focus:ring-2 focus:ring-novaNavy outline-none"
                defaultValue="NovaBooks Inc."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                Business Email
              </label>
              <input
                type="email"
                className="w-full bg-gray-50 border-gray-100 rounded-2xl p-4 text-novaNavy font-bold focus:ring-2 focus:ring-novaNavy outline-none"
                defaultValue="admin@novabooks.com"
              />
            </div>
          </div>
          <button className="mt-8 px-8 py-4 bg-novaNavy text-white font-black rounded-2xl hover:bg-blue-900 transition-all shadow-lg active:scale-95">
            UPDATE PROFILE
          </button>
        </section>

        {/* Appearance Section */}
        <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-novaNavy mb-4">Appearance</h3>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div>
              <p className="font-bold text-novaNavy">Brand Colors</p>
              <p className="text-sm text-gray-500">
                Navy and Gold theme is currently active.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-novaNavy border-2 border-white shadow-sm" />
              <div className="w-6 h-6 rounded-full bg-novaGold border-2 border-white shadow-sm" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
