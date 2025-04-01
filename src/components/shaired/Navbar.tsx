"use client";
import Logo from "@/app/assets/logo/Logo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { getUser } from "../getUser/userFound";
import { usePathname } from "next/navigation"; // Add usePathname
import CardProfile from "./CardProfile";
import { TUserIn } from "@/app/types/medicinestype";
import { IoIosArrowDown } from "react-icons/io";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [meMenu, setMeMenu] = useState(false);
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
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10 overflow-hidden">
      <div className="container mx-auto px-4 py-[5px] relative">
        <div className="flex justify-between items-center h-16">
          <div className="mb-[15px]">
            <Link href="/">
              <Logo />
            </Link>
          </div>
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
            <div
              className={`${
                user?.role ? "hidden" : ""
              } flex gap-[25px] items-center`}
            >
              <Link
                href="/"
                className={`text-gray-700 hover:text-blue-600 ${
                  isActive("/shop") ? "text-[#5f63f2] !important" : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className={`text-gray-700 hover:text-blue-600 ${
                  isActive("/shop") ? "text-[#5f63f2] !important" : ""
                }`}
              >
                Shop
              </Link>
              <Link
                onClick={() => setMeMenu(!meMenu)}
                href="#"
                className={`text-gray-700 font-normal flex justify-between items-center gap-[5px]`}
              >
                <>Medicine</>
                <IoIosArrowDown />
              </Link>
              <Link
                href="/login"
                className={`text-gray-700 hover:text-blue-600 ${
                  isActive("/admin") ? "text-[#5f63f2] !important" : ""
                }`}
              >
                Login
              </Link>
              <CardProfile />
            </div>
            {user?.role === "admin" && (
              <>
                <Link
                  href="/"
                  className={`text-gray-700 hover:text-blue-600 ${
                    isActive("/") ? "text-[#5f63f2] !important" : ""
                  }`}
                >
                  Home
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
                  href="/shop"
                  className={`text-gray-700 hover:text-blue-600 ${
                    isActive("/shop") ? "text-[#5f63f2] !important" : ""
                  }`}
                >
                  Shop
                </Link>
                <Link
                  onClick={() => setMeMenu(!meMenu)}
                  href="#"
                  className={`text-gray-700 font-normal flex justify-between items-center gap-[5px]`}
                >
                  <>Medicine</>
                  <IoIosArrowDown />
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
            )}
            {user?.role === "customer" && (
              <>
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

                <CardProfile />
              </>
            )}
          </div>
        </div>

        {/* therre add mega menu icons and text */}

        <div className={`${meMenu ? "" : "hidden"} mt-[30px]`}>
          <div>
            <div className="grid grid-cols-3 gap-[25px]">
              {/* Injectable Formulations */}
              <div className="border-l-2 pl-6">
                <h5 className="font-bold">Injectable Formulations</h5>
                <ul>
                  <li>
                    <Link
                      href="/search?name=PainRelief"
                      onClick={() => setMeMenu(false)}
                    >
                      Pain Relief Injections
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/search?name=MigraineRelief"
                      onClick={() => setMeMenu(false)}
                    >
                      Migraine Injections
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/search?name=Intravenous&manufacturer=HealthPro"
                      onClick={() => setMeMenu(false)}
                    >
                      IV Therapy Solutions
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Topical Formulations */}
              <div className="border-l-2 pl-6">
                <h5 className="font-bold">Topical Formulations</h5>
                <ul>
                  <li>
                    <Link
                      href="/search?name=ClearSkin"
                      onClick={() => setMeMenu(false)}
                    >
                      Acne Treatment Creams
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/search?name=JointFlex"
                      onClick={() => setMeMenu(false)}
                    >
                      Joint Pain Creams
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/search?description=inflammation&type=cream"
                      onClick={() => setMeMenu(false)}
                    >
                      Anti-Inflammatory Gels
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Other Specialized Forms */}
              <div className="border-l-2 pl-6">
                <h5 className="font-bold">Other Specialized Forms</h5>
                <ul>
                  <li>
                    <Link
                      href="/search?name=SleepWell"
                      onClick={() => setMeMenu(false)}
                    >
                      Sleep Aid Tablets
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/search?name=ProBioFlora"
                      onClick={() => setMeMenu(false)}
                    >
                      Probiotic Capsules
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/search?name=DiabetesCare"
                      onClick={() => setMeMenu(false)}
                    >
                      Blood Sugar Support
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/search?name=EnergyBoost"
                      onClick={() => setMeMenu(false)}
                    >
                      Energy Tablets
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/search?name=CoughGuard"
                      onClick={() => setMeMenu(false)}
                    >
                      Cough Syrups
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/search?name=StomachEase"
                      onClick={() => setMeMenu(false)}
                    >
                      Digestive Tablets
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 mt-4 pb-4">
              <div
                className={`${
                  user?.role ? "hidden" : ""
                } flex gap-[25px] items-center`}
              >
                <Link
                  href="/shop"
                  className={`text-gray-700 hover:text-blue-600 ${
                    isActive("/shop") ? "text-[#5f63f2] !important" : ""
                  }`}
                >
                  Shop
                </Link>
                <Link
                  href="/login"
                  className={`text-gray-700 hover:text-blue-600 ${
                    isActive("/admin") ? "text-[#5f63f2] !important" : ""
                  }`}
                >
                  Login
                </Link>
              </div>
              {user?.role === "admin" && (
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
                </>
              )}
              {user?.role === "customer" && (
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
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
