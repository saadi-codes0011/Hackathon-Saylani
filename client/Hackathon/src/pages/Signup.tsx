import { message } from "antd";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Eye, CheckCircle, FolderPen, Mail, LockKeyhole, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import API from "../api/axiosInstance";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  });

  const inputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const { setIsAuthenticated } = useAuth();

  const submitbtn = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    let allErrors = { name: "", email: "", password: "" };

    if (!formData.name.trim()) allErrors.name = "Name is required!";
    if (!formData.email.trim()) allErrors.email = "Email is required!";
    if (!formData.password.trim()) allErrors.password = "Password is required!";

    setErrors(allErrors);
    if (allErrors.name || allErrors.email || allErrors.password) return;
    try {
      const response = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);

        setIsAuthenticated(true);
        message.success(response.data.message || "Account Created Successfully!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Server not connected";
      message.error("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[60%_40%] bg-slate-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center px-6 py-10"
      >
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">SmartPay</h1>
          <h2 className="text-3xl font-bold mb-2">Create Your Free Account</h2>
          <p className="text-slate-600 mb-8 text-sm">Automate your HR in minutes</p>

          <form onSubmit={submitbtn}>
            <div className="mb-4">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FolderPen className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={inputchange}
                  placeholder="Enter your name"
                  className={`w-full border rounded-lg pl-10 pr-3 py-2.5 transition-all outline-none
                    ${errors.name ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-slate-300 focus:border-blue-900"}
                  `}
                />
              </div>
              <div className="min-h-[1px] mt-1">
                {errors.name && <p className="text-red-500 text-[11px]">{errors.name}</p>}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={inputchange}
                  placeholder="Enter your email"
                  className={`w-full border rounded-lg pl-10 pr-3 py-2.5 transition-all outline-none
                    ${errors.email ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-slate-300 focus:border-blue-900"}
                  `}
                />
              </div>
              <div className="min-h-[1px] mt-1">
                {errors.email && <p className="text-red-500 text-[11px]">{errors.email}</p>}
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockKeyhole className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={inputchange}
                  placeholder="Enter your password"
                  className={`w-full border rounded-lg pl-10 pr-10 py-2.5 transition-all outline-none
                    ${errors.password ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-slate-300 focus:border-blue-900"}
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-blue-900 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="min-h-[18px] mt-1">
                {errors.password ? (
                  <p className="text-red-500 text-[11px]">{errors.password}</p>
                ) : (
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Must be 8+ characters</span>
                    <span className="text-blue-600 font-semibold">Strength: Medium</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-start gap-2 mb-6 mt-4">
              <input type="checkbox" className="mt-1 accent-blue-900 cursor-pointer h-4 w-4" />
              <p className="text-xs text-slate-600">
                I agree to the <span className="text-blue-900 font-semibold cursor-pointer hover:underline">Terms</span> &
                <span className="text-blue-900 font-semibold cursor-pointer hover:underline"> Privacy Policy</span>
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={loading} // Jab loading true ho, button click nahi hoga
              whileHover={{ scale: loading ? 1 : 1.01 }} // Loading ke waqt animation band
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className={`w-full py-3 rounded-lg font-bold text-lg transition-all shadow-lg shadow-blue-900/20 
    ${loading ? "bg-blue-700 cursor-not-allowed text-white/70" : "bg-blue-900 hover:bg-blue-800 text-white"}`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </form>

          <p className="text-sm text-center mt-8 text-slate-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-900 font-bold hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </motion.div>
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-slate-950 text-white p-12 relative overflow-hidden">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-center z-10"
        >
          <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md mb-8 inline-block border border-white/10">
            <CheckCircle size={64} className="text-blue-300 mx-auto" />
          </div>
          <h3 className="text-4xl font-bold mb-4">HR Automation Made Easy</h3>
          <p className="text-blue-100 text-lg max-w-sm mx-auto opacity-80 leading-relaxed">
            Attendance, payroll, and team growth in one unified platform.
          </p>
        </motion.div>

        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}