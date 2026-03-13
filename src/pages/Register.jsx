import React, { useContext, useState } from "react";
import api from "../api/axios.js";
import Logo from "../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Alert, Snackbar, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";

const registerSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  // confirmPassword: z.string().min(1, "Please confirm your password"),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

export default function Register() {
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
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { confirmPassword, ...submitData } = data;
      const res = await api.post("/auth/register", submitData);
      login(res.data);
      setSnackbar({
        open: true,
        message: "Account created! Redirecting to login...",
        severity: "success",
      });
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      const errMsg =
        err.response?.data?.message || "Registration failed. Try again.";
      setSnackbar({ open: true, message: errMsg, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8">
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

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img alt="NovaBooks" src={Logo} className="mx-auto h-30 w-50 mb-4" />
        <h2 className="text-center text-3xl font-extrabold text-novaNavy">
          Create Account
        </h2>
        <p className="mt-2 text-center text-sm font-medium text-novaGold">
          Begin your NovaBooks journey today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-novaNavy mb-1">
                Full Name
              </label>
              <input
                {...register("name")}
                placeholder="John Doe"
                className={`w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-novaNavy transition-all ${
                  errors.name
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs font-bold text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-novaNavy mb-1">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="john@example.com"
                className={`w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-novaNavy transition-all ${
                  errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs font-bold text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="text-sm font-bold text-novaNavy">
                  Password
                </label>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 flex justify-center items-center rounded-2xl bg-novaNavy px-4 py-4 text-sm font-black text-white shadow-xl hover:bg-[#152c6d] active:scale-[0.97] transition-all disabled:opacity-50"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm font-medium text-gray-500">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-bold text-novaGold hover:text-novaGoldDark transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
