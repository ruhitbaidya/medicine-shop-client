"use client";
import { postApi } from "@/components/api/apiCom";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
const Register = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const result = await postApi(
      `${process.env.NEXT_PUBLIC_API_URL}/create-user` as string,
      data
    );
    if (result) {
      setLoading(false);
      console.log(result);
      toast.success(result.message);
    }
    if (result.errorMessage) {
      toast.error(result.errorMessage);
    }
    reset();
  };
  return (
    <div>
      {" "}
      <div>
        {" "}
        <div className="bg-gray-200">
          <div className="container mx-auto">
            <div className="h-screen flex justify-center items-center">
              <div className="bg-gray-100 p-[50px] rounded-lg w-[95%] lg:w-[50%] mx-uato">
                <div>
                  <p className="text-left">Please Enter Your Details</p>
                  <h2 className="text-left text-4xl mb-[20px]">Register</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-[20px]">
                    <input
                      type="text"
                      placeholder="Enter Your Name!"
                      {...register("name")}
                      className="w-full focus:outline-none border border-gray-400 rounded-lg p-[10px]"
                    />
                  </div>
                  <div className="mb-[20px]">
                    <input
                      type="email"
                      placeholder="Enter Your Email!"
                      {...register("email")}
                      className="w-full focus:outline-none border border-gray-400 rounded-lg p-[10px]"
                    />
                  </div>
                  <div className="mb-[20px]">
                    <input
                      {...register("phone")}
                      type="phone"
                      placeholder="Enter Your Phone!"
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
                      If You Hanve An Account{" "}
                      <Link className="text-[#5f63f2]" href="/login">
                        Please Login
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
                        "Register"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
