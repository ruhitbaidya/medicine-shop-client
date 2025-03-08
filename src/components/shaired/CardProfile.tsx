"use client";
import { useContext, useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Logout } from "../getUser/logOutUser";
import { useRouter } from "next/navigation";
import { getUser } from "../getUser/userFound";
import { TUserIn } from "@/app/types/medicinestype";
import { ContextCreate } from "@/Context/ContextProvide";
import Link from "next/link";

const CardProfile = () => {
  const { card } = useContext(ContextCreate);

  const [user, setUser] = useState<TUserIn | null>(null);
  const router = useRouter();
  const handelLogout = async () => {
    await Logout();
    router.push("/login");
  };
  const getDatas = async () => {
    const res = await getUser();
    setUser(res!);
  };
  useEffect(() => {
    getDatas();
  }, []);
  return (
    <>
      <Link href="/card">
        <button className="btns relative">
          <FaShoppingBag />
          <span className="bg-[#5f63f2] text-white absolute -top-2 -right-2 text-[15px] rounded-full w-[25px] h-[25px] flex justify-center items-center">
            {card.length}
          </span>
        </button>
      </Link>
      {user ? (
        <>
          <button onClick={handelLogout} className="btns">
            <RiLogoutCircleRLine />
          </button>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CardProfile;
