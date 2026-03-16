import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AppLayout } from "./layout/AppLayout";
// import Accounts from "./pages/Accounts";
// import Transactions from "./pages/Transactions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
