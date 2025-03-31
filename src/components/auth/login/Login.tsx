/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { postApi } from "@/components/api/apiCom";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { setCookie } from "../SGCokkie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiHome, FiMail, FiLock, FiArrowRight } from "react-icons/fi";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    localStorage.removeItem("userInfo");
    setLoading(true);
    try {
      const res = await postApi(
        `${process.env.NEXT_PUBLIC_API_URL}/auth`,
        data
      );
      if (res) {
        reset();
        toast.success(res.message);
        await setCookie(res.data);
        router.push("/");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header with Home Link */}
        <div className="flex justify-between items-center pt-8">
          <Link
            href="/"
            className="flex items-center text-[#5f63f2] hover:text-[#4a4fc9] transition-colors"
          >
            <FiHome className="mr-2" />
            Return Home
          </Link>
        </div>

        {/* Login Card */}
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Please enter a valid email",
                      },
                    })}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f63f2] focus:border-[#5f63f2] outline-none transition"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f63f2] focus:border-[#5f63f2] outline-none transition"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5f63f2] hover:bg-[#4a4fc9] text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex justify-center items-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Login <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>

              {/* Register Link */}
              <div className="text-center text-sm text-gray-600 mt-4">
                {`Don't have an account?`}{" "}
                <Link
                  href="/register"
                  className="text-[#5f63f2] font-medium hover:underline"
                >
                  Create one
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
