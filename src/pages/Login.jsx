import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "../api/axios.js";
import Logo from "../assets/logo2.png";
import { Alert, Snackbar, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const showToast = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", data);
      login(res.data);
      showToast("Welcome back! Redirecting...", "success");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
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
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", borderRadius: "12px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <img alt="NovaBooks" src={Logo} className="mx-auto h-30 w-50 mb-4" />
        <h2 className="text-3xl font-extrabold tracking-tight text-novaNavy">
          Sign in to NovaBooks
        </h2>
        <p className="mt-2 text-sm font-medium text-novaGold">
          Enter your details to access your dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-novaNavy mb-1.5 ml-1">
                Email Address
              </label>
              <div className="mt-2">
                <input
                  {...register("email")}
                  type="email"
                  disabled={loading}
                  placeholder="name@company.com"
                  className={`block w-full rounded-2xl border px-4 py-3 text-novaNavy transition-all outline-none focus:ring-2 focus:ring-novaNavy ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 ml-1 text-xs font-bold text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="text-sm font-bold text-novaNavy">
                  Password
                </label>
                <Link
                  to="/forgot"
                  className="text-xs font-bold text-novaGold hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  disabled={loading}
                  className={`block w-full rounded-2xl border px-4 py-3 text-novaNavy transition-all outline-none focus:ring-2 focus:ring-novaNavy ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-novaNavy"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 ml-1 text-xs font-bold text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full flex justify-center items-center rounded-2xl bg-novaNavy px-4 py-4 text-sm font-black text-white shadow-xl hover:bg-[#152c6d] active:scale-[0.97] transition-all disabled:opacity-50"
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign In to Dashboard"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm font-medium text-gray-500">
              Need an account?{" "}
              <Link
                to="/register"
                className="font-bold text-novaGold hover:text-novaGoldDark transition-colors"
              >
                Join NovaBooks
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
