"use client";

import { Tuser } from "@/app/types/medicinestype";
import { postApi } from "@/components/api/apiCom";
import { Logout } from "@/components/getUser/logOutUser";
import Spinner from "@/components/shaired/spinner";
import { ContextCreate } from "@/Context/ContextProvide";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const Profile = () => {
  const { user } = useContext(ContextCreate);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Tuser | null>(null);

  const { register, handleSubmit, reset } = useForm<Tuser>({
    defaultValues: {
      name: users?.name || "",
      email: users?.email || "",
      phone: users?.phone || "",
    },
  });

  const onSubmit: SubmitHandler<Tuser> = async (data) => {
    if (users?._id) {
      try {
        const res = await postApi(
          `${process.env.NEXT_PUBLIC_API_URL}/updateUser`,
          {
            ...data,
            id: users._id,
          }
        );
        if (res.data) {
          toast.success(res?.message);
          Logout();
          router.push("/login");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile.");
      }
    }
  };

  useEffect(() => {
    if (user) {
      setUsers(user);
      setLoading(false);
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user, reset]); // Add `reset` to the dependency array

  return (
    <div>
      <div className="container mx-auto px-[10px] h-[70vh] flex justify-center items-center">
        {loading ? (
          <Spinner />
        ) : (
          <div className="w-[100%] lg:w-[70%] mx-auto p-[20px] lg:p-[50px] bg-gray-100 border border-[#5f63f2] rounded-lg">
            <h5 className="mb-[20px] text-3xl">Update Profile</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-8">
                <div>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Enter name"
                    className="focus:outline-none w-full p-[10px] border rounded-lg border-[#5f63f2]"
                  />
                </div>
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter email"
                    className="focus:outline-none w-full p-[10px] border rounded-lg border-[#5f63f2]"
                  />
                </div>
                <div>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="Enter phone"
                    className="focus:outline-none w-full p-[10px] border rounded-lg border-[#5f63f2]"
                  />
                </div>
                <div>
                  <button type="submit" className="btns w-full">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
