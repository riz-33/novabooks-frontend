import React, { useState, useContext } from "react";
import api from "../api/axios.js";
import Logo from "../assets/logo2.png";
// import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Snackbar, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  //   const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const showToast = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      // login(res.data);
      showToast("Welcome back! Redirecting...", "success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      const errMsg =
        err.response?.data?.message || "Connection error. Please try again.";
      showToast(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", borderRadius: 2, fontWeight: "600" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <img alt="NovaBooks Logo" src={Logo} className="h-30 w-50" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-[#1e3a8a]">
          Sign in to NovaBooks
        </h2>
        <p className="mt-2 text-center text-sm text-[#d4af37]/70">
          Enter your details to access your dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#1e3a8a]">
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={loading}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="block w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-[#1e3a8a] placeholder-gray-400 transition-all focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1e3a8a]">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={loading}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="block w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-[#1e3a8a] placeholder-gray-400 transition-all focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#1e3a8a] transition-colors"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer group relative flex w-full justify-center items-center rounded-xl bg-[#1e3a8a] px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#152c6d] active:scale-[0.98] transition-all disabled:bg-[#1e3a8a]/50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Sign In to Dashboard"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm font-medium text-[#d4af37]">
              New to NovaBooks?{" "}
              <Link
                to="/register"
                className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
