import { message } from "antd"
import { motion } from "framer-motion"
import { useAuth } from '../context/AuthContext';

import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  Globe
} from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import API from "../api/axiosInstance"

export default function LoginPage() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  })

  // INPUT CHANGE
  const inputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: ""
    })
  }

  const { setIsAuthenticated } = useAuth();
  const submitbtn = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    let allErrors = { email: "", password: "" }

    if (!formData.email.trim()) {
      allErrors.email = "Email is required!"
    }

    if (!formData.password.trim()) {
      allErrors.password = "Password is required!"
    }

    setErrors(allErrors)

    if (allErrors.email || allErrors.password) {
      setLoading(false);
      return;
    }

    try {
      // 1. Path ko '/auth/login' karein
      const response = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password
      });
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));

        setIsAuthenticated(true);

        navigate("/dashboard");
        message.success("Successfully Login!");
      } else {
        // Agar response mein token nahi mila
        message.error("Login failed: Token not received");
      }
    } catch (error: any) {
      console.log(error);
      const msg = error.response?.data?.message || "Server not connected";
      message.error("Login Failed: " + msg);
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-10 bg-slate-50">

      {/* LEFT: LOGIN FORM */}
      <div className="lg:col-span-7 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
        >

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome Back
            </h1>
            <p className="text-slate-500 mt-2">
              Sign in to your SmartPay account
            </p>
          </div>

          <div className="space-y-6">

            {/* Email */}
            <motion.div whileFocus={{ scale: 1.01 }}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={inputchange}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none
                    ${errors.email
                      ? "border border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border border-slate-200 focus:ring-2 focus:ring-blue-900"
                    }`}
                />
              </div>
              <div className="min-h-[16px] mt-1">
                {errors.email && (
                  <p className="text-red-500 text-[11px]">
                    {errors.email}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Password */}
            <motion.div whileFocus={{ scale: 1.01 }}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-900 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={inputchange}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 rounded-lg outline-none
                    ${errors.password
                      ? "border border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border border-slate-200 focus:ring-2 focus:ring-blue-900"
                    }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-900 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="min-h-[16px] mt-1">
                {errors.password && (
                  <p className="text-red-500 text-[11px]">
                    {errors.password}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 accent-blue-900" />
              <span className="text-sm text-slate-600">
                Remember me
              </span>
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              <motion.button
                onClick={submitbtn}
                disabled={loading} // Disable button during load
                whileHover={{ scale: loading ? 1 : 1.03 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                className={`w-full py-3 rounded-lg font-semibold shadow-lg transition-all 
    ${loading ? "bg-blue-700 cursor-not-allowed text-white/70" : "bg-blue-900 text-white"}`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full border border-slate-200 py-3 rounded-lg
                           font-medium flex items-center justify-center gap-3
                           text-slate-700 hover:bg-slate-50"
              >
                <Globe className="w-5 h-5 text-blue-900" />
                Sign in with Google
              </motion.button>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-slate-600 mt-6">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-blue-900 font-medium hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* RIGHT VISUAL */}
      <div className="hidden lg:flex lg:col-span-3 items-center justify-center
                      bg-gradient-to-br from-blue-900 to-slate-900
                      text-white relative overflow-hidden">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="text-center px-6"
        >
          <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-blue-300" />
          <p className="text-lg font-medium">
            Your data is secured with
          </p>
          <p className="text-xl font-bold mt-1">
            AES-256 Encryption
          </p>
        </motion.div>
      </div>
    </div>
  )
}
