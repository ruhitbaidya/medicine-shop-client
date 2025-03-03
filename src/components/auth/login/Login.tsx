"use client";
import { postApi } from "@/components/api/apiCom";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { setCookie } from "../SGCokkie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "@/components/getUser/userFound";
type Inputs = {
  email: string;
  password: string;
};
const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const res = await postApi(
      `${process.env.NEXT_PUBLIC_API_URL}/auth` as string,
      data
    );
    if (res) {
      reset();
      setLoading(false);
      toast.success(res.message);
      await setCookie(res.data);
      router.push("/");
    }
  };
  const founder = async () => {
    const userInfo = await getUser();
    console.log(userInfo);
  };
  useEffect(() => {
    founder();
  }, []);
  return (
    <div>
      <div className="bg-gray-200">
        <div className="container mx-auto">
          <div className="h-screen flex justify-center items-center border">
            <div className="bg-gray-100 p-[50px] rounded-lg w-[95%] lg:w-[50%] mx-uato">
              <div>
                <p className="text-left">Please Enter Your Details</p>
                <h2 className="text-left text-4xl mb-[20px]">Welcome Back</h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-[20px]">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter Your Email!"
                    className="w-full focus:outline-none border border-gray-400 rounded-lg p-[10px]"
                  />
                </div>
                <div>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Enter Your Password!"
                    className="w-full focus:outline-none border border-gray-400 rounded-lg p-[10px]"
                  />
                </div>
                <div>
                  <p>
                    If You Have Not Account Please{" "}
                    <Link className="text-[#5f63f2]" href="/register">
                      Register
                    </Link>
                  </p>
                </div>
                <div>
                  <button className="w-full btns">
                    {loading ? (
                      <>
                        <div className="flex justify-center items-center">
                          <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                        </div>
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
