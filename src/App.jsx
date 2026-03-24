import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AppLayout } from "./layout/AppLayout";
import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";
import Ledger from "./pages/Ledger";
import Reports from "./pages/Reports";
import ProfitLoss from "./pages/ProfitLoss";
// import Transactions from "./pages/Transactions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/pnl" element={<ProfitLoss />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />

          {/* <Route path="/transactions" element={<Transactions />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
