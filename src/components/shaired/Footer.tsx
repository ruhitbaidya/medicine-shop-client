"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-[var(--text-color)] pt-12 pb-6">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-400">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--primary-color)]">
              RM-Corner
            </h2>
            <p className="mt-3 text-[var(--secondary-color)] leading-relaxed">
              Your trusted online pharmacy, delivering high-quality medicines &
              healthcare products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--primary-color)]">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 border-0">
              <li>
                <Link
                  href="/"
                  className="hover:text-[var(--hover-color)] transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[var(--hover-color)] transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-[var(--hover-color)] transition"
                >
                  Shop Now
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[var(--hover-color)] transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--primary-color)]">
              Customer Service
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[var(--hover-color)] transition"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-[var(--hover-color)] transition"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[var(--hover-color)] transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-[var(--hover-color)] transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--primary-color)]">
              Follow Us
            </h3>
            <div className="mt-4 flex space-x-4">
              <Link href="https://facebook.com" target="_blank">
                <FaFacebookF className="w-8 h-8 p-2 bg-[var(--primary-color)] text-white rounded-full hover:bg-[var(--hover-color)] transition" />
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <FaTwitter className="w-8 h-8 p-2 bg-[var(--primary-color)] text-white rounded-full hover:bg-[var(--hover-color)] transition" />
              </Link>
              <Link href="https://instagram.com" target="_blank">
                <FaInstagram className="w-8 h-8 p-2 bg-[var(--primary-color)] text-white rounded-full hover:bg-[var(--hover-color)] transition" />
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <FaLinkedinIn className="w-8 h-8 p-2 bg-[var(--primary-color)] text-white rounded-full hover:bg-[var(--hover-color)] transition" />
              </Link>
              <Link href="https://youtube.com" target="_blank">
                <FaYoutube className="w-8 h-8 p-2 bg-[var(--primary-color)] text-white rounded-full hover:bg-[var(--hover-color)] transition" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-[var(--secondary-color)] mt-6">
          <p>© {new Date().getFullYear()} RM-Corner | All Rights Reserved.</p>
          <p className="mt-2">
            Built with ❤️ by{" "}
            <Link
              href="https://ruhitbaidya.vercel.app"
              className="text-[var(--primary-color)] hover:text-[var(--hover-color)] transition"
            >
              Ruhit Baidya
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
