"use client";
import Logo from "@/app/assets/logo/Logo";
import Link from "next/link";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-[15px]">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <Logo />
          </Link>
          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden flex gap-[8px]">
            <button>
              <FaShoppingBag />
            </button>
            <button>
              <CgProfile />
            </button>
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
            <Link href="/shop" className="text-gray-700 hover:text-blue-600">
              Shop
            </Link>
            <Link href="/orders" className="text-gray-700 hover:text-blue-600">
              Orders
            </Link>

            <Link href="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <button>
              <Link href="/card">
                <FaShoppingBag size={20} />
              </Link>
            </button>
            <button>
              <Link href="/user">
                <CgProfile size={20} />
              </Link>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 mt-4 pb-4">
              <Link href="/shop" className="text-gray-700 hover:text-blue-600">
                Shop
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-blue-600">
                Cart
              </Link>
              <Link
                href="/orders"
                className="text-gray-700 hover:text-blue-600"
              >
                Orders
              </Link>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-blue-600"
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
