"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { ContextCreate } from "@/Context/ContextProvide";
import { postApi } from "@/components/api/apiCom";

type Inputs = {
  title: string;
  description: string;
};
const BlogsForm = () => {
  const { user } = useContext(ContextCreate);
  const [texts, setTexts] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | "">("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setTexts("");
    if (image !== null) {
      const formData = new FormData();
      formData.append("image", image);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_BB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await res.json();
      if (result.data.display_url) {
        const fiData = {
          ...data,
          image: result.data.display_url,
          author: user?.name,
        };
        const res = await postApi(
          `${process.env.NEXT_PUBLIC_API_URL}/create-blog`,
          fiData
        );
        if (res.data._id) {
          setPreview("");
          setImage(null);
          setTexts(res.message);
          setLoading(false);
          toast.success(res.message);
          reset();
        } else {
          setTexts(res.message);
          setLoading(false);
          toast.success(res.message);
          reset();
        }
      }
    } else {
      setTexts("Select Image");
      setLoading(false);
      toast.error("Please Select Image");
    }
  };

  return (
    <div>
      <div>
        <h2 className="font-bold text-2xl">Blog Create Form</h2>
        {texts && (
          <div className="text-red-600 !important font-bold">{texts}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center gap-[25px]">
            <div>
              <label htmlFor="image">Blog Image</label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (!file) {
                    toast.error("Please select image");
                    setPreview("");
                    return;
                  }
                  setTexts("");
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }}
                type="file"
                className="w-full p-[10px] rounded-lg"
              />
            </div>
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

export default BlogsForm;
