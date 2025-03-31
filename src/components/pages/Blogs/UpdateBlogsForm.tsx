"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { patchApi } from "@/components/api/apiCom";
import { TBlog } from "@/app/types/medicinestype";

type Inputs = {
  title: string;
  description: string;
};
const UpdateBlogsForm = ({ data }: { data: TBlog }) => {
  const [detaultValue, setDefaultValue] = useState(data);
  const [texts, setTexts] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | "">("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: detaultValue?.title,
      description: detaultValue?.description,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setTexts("");
    console.log(detaultValue._id);
    if (detaultValue._id) {
      const res = await patchApi(
        `${process.env.NEXT_PUBLIC_API_URL}/update-blog/${detaultValue?._id}`,
        data
      );
      if (res.data.modifiedCount > 0) {
        setTexts(res.message);
        setLoading(false);
        toast.success(res?.message);
      }
      console.log(res);
    }
  };
  useEffect(() => {
    if (data) {
      reset({
        title: data?.title || "",
        description: data?.description || "",
      });
      setPreview(data?.image);
    }

    setDefaultValue(data);
  }, [data, reset]);
  return (
    <div>
      <div>
        <h2 className="font-bold text-2xl">Blog Update Form</h2>
        {texts && (
          <div className="text-red-600 !important font-bold">{texts}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex  items-center gap-[25px]">
            <div>
              <Image width={200} height={200} alt="image" src={preview} />
            </div>
          </div>
          <div>
            <label htmlFor="title">Blog Title</label>
            <input
              {...register("title", { required: true })}
              type="text"
              className="w-full p-[10px] rounded-lg focus:outline-none border"
              placeholder="Enter Title"
            />
            {errors.title && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div>
            <label htmlFor="desc">Blog Descritption</label>
            <textarea
              {...register("description", { required: true })}
              id=""
              className="w-full p-[10px] rounded-lg focus:outline-none border"
              placeholder="Enter Description"
            ></textarea>
            {errors.description && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div>
            <button className="btn bg-[var(--primary-color)] text-white">
              {loading ? <>Loading...</> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlogsForm;
