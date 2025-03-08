"use client";
import Logo from "@/app/assets/logo/Logo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { getUser } from "../getUser/userFound";
import { usePathname } from "next/navigation"; // Add usePathname
import CardProfile from "./CardProfile";
import { TUserIn } from "@/app/types/medicinestype";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [user, setUser] = useState<TUserIn | undefined | null>(null);
  const pathname = usePathname();

  const userFounder = async () => {
    const data = await getUser();
    setUser(data);
  };
  useEffect(() => {
    userFounder();
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to check if the current route is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-[15px]">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <Logo />
          </Link>
          <div className="md:hidden flex gap-[8px]">
            <CardProfile />
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <CiMenuFries size={20} />
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {user?.role === "admin" ? (
              <>
                <Link
                  href="/shop"
                  className={`text-gray-700 hover:text-blue-600 ${
                    isActive("/shop") ? "text-[#5f63f2] !important" : ""
                  }`}
                >
                  Shop
                </Link>
                <Link
                  href="/order"
                  className={`text-gray-700 hover:text-blue-600 ${
                    isActive("/order") ? "text-[#5f63f2] !important" : ""
                  }`}
                >
                  Orders
                </Link>
                <Link
                  href="/profile"
                  className={`text-gray-700 hover:text-blue-600 ${
                    isActive("/profile") ? "text-[#5f63f2] !important" : ""
                  }`}
                >
                  Profile
                </Link>
                <Link
                  href="/admin"
                  className={`text-gray-700 hover:text-blue-600 ${
                    isActive("/admin") ? "text-[#5f63f2] !important" : ""
                  }`}
                >
                  Dashboard
                </Link>
                <CardProfile />
              </>
            ) : (
              <>
                <Link
                  href="/shop"
                  className={`text-gray-700 hover:text-blue-600 ${
                    isActive("/shop") ? "text-[#5f63f2] !important" : ""
                  }`}
                >
                  Shop
                </Link>
                <Link
                  href="/order"
                  className={`text-gray-700 hover:text-blue-600 ${
                    isActive("/order") ? "text-[#5f63f2] !important" : ""
                  }`}
                >
                  Orders
                </Link>
                <Link
                  href="/profile"
                  className={`text-gray-700 hover:text-blue-600 ${
                    isActive("/profile") ? "text-[#5f63f2] !important" : ""
                  }`}
                >
                  Profile
                </Link>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>

                <CardProfile />
              </>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 mt-4 pb-4">
              <Link
                href="/shop"
                className={`text-gray-700 hover:text-blue-600 ${
                  isActive("/shop") ? "text-[#5f63f2] !important" : ""
                }`}
              >
                Shop
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-blue-600">
                Cart
              </Link>
              <Link
                href="/orders"
                className={`text-gray-700 hover:text-blue-600 ${
                  isActive("/orders") ? "text-[#5f63f2] !important" : ""
                }`}
              >
                Orders
              </Link>
              <Link
                href="/profile"
                className={`text-gray-700 hover:text-blue-600 ${
                  isActive("/profile") ? "text-[#5f63f2] !important" : ""
                }`}
              >
                Profile
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
