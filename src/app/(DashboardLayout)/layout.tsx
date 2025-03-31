"use client";
import { Logout } from "@/components/getUser/logOutUser";
import { ContextCreate } from "@/Context/ContextProvide";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useContext, useState } from "react";
import { FiMenu, FiHome, FiBarChart, FiUsers } from "react-icons/fi";
import { CiDiscount1 } from "react-icons/ci";
import { SiBlogger } from "react-icons/si";
import { IoIosSend } from "react-icons/io";
export default function Dashboard({ children }: { children: ReactNode }) {
  const { setUser, user } = useContext(ContextCreate);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Use usePathname to get the current path
  const handelLogout = async () => {
    await Logout();
    setUser(null);
    router.push("/login");
  };

  // Function to check if the current route is active
  const isActive = (path: string) => {
    return pathname === path;
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:relative bg-white w-64 p-5 h-full transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 shadow-lg z-10`}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">
            <Link href="/">Dashboard</Link>
          </h2>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            ✖
          </button>
        </div>
        <nav className="space-y-4">
          <Link
            href="/admin/medicines"
            className={`flex items-center gap-2 p-2 rounded-lg ${
              isActive("/admin/medicines")
                ? "bg-[#5f63f2] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <FiHome size={20} /> Medicine
          </Link>
          <Link
            href="/admin/orders"
            className={`flex items-center gap-2 p-2 rounded-lg ${
              isActive("/admin/orders")
                ? "bg-[#5f63f2] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <FiBarChart size={20} /> Order
          </Link>
          <Link
            href="/admin/users"
            className={`flex items-center gap-2 p-2 rounded-lg ${
              isActive("/admin/users")
                ? "bg-[#5f63f2] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <FiUsers size={20} /> Users
          </Link>
          <Link
            href="/admin/createDiscount"
            className={`flex items-center gap-2 p-2 rounded-lg ${
              isActive("/admin/createDiscount")
                ? "bg-[#5f63f2] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <CiDiscount1 size={20} /> Discounts
          </Link>
          <Link
            href="/admin/blogs"
            className={`flex items-center gap-2 p-2 rounded-lg ${
              isActive("/admin/blogs")
                ? "bg-[#5f63f2] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <SiBlogger size={20} /> Blog
          </Link>
          <Link
            href="/admin/subscribe"
            className={`flex items-center gap-2 p-2 rounded-lg ${
              isActive("/admin/subscribe")
                ? "bg-[#5f63f2] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <IoIosSend size={20} /> Subscribe
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-white shadow p-4 flex justify-between items-center">
          <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
            <FiMenu size={24} />
          </button>
          <div className="flex gap-[25px] items-center justify-between w-full">
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <button className="btns" onClick={handelLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="p-7">{children}</div>
      </div>
    </div>
  );
}
