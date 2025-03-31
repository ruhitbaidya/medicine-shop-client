"use client";
import { TBlog } from "@/app/types/medicinestype";
import { deleteApi, getApi } from "@/components/api/apiCom";
import BlogsForm from "@/components/pages/Blogs/BlogsForm";
import UpdateBlogsForm from "@/components/pages/Blogs/UpdateBlogsForm";
import Spinner from "@/components/shaired/spinner";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

const BlogsPage = () => {
  const [updateDataPass, setUpdateDataPass] = useState<TBlog | null>(null);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<TBlog[] | []>([]);
  const modalRef = useRef<HTMLDialogElement>(null);
  const modaluRef = useRef<HTMLDialogElement>(null);
  const getAllBlogs = async () => {
    setLoading(true);
    const res = await getApi(
      `${process.env.NEXT_PUBLIC_API_URL}/get-all-blogs`
    );
    if (res.data.length > 0) {
      setLoading(false);
      setBlogs(res.data);
    }
    console.log(res.data);
  };

  const handelDelete = async (id: string) => {
    const res = await deleteApi(
      `${process.env.NEXT_PUBLIC_API_URL}/delete-blog/${id}`
    );

    if (res.data.deletedCount > 0) {
      toast.success(res?.message);
      const fiBlogs = blogs.filter((item) => item._id !== id);
      setBlogs(fiBlogs);
    }
    console.log(res);
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-2xl">Blogs</h2>
        </div>
        <div>
          <button
            onClick={() => modalRef.current?.showModal()}
            className="px-[45px] cursor-pointer py-[15px] bg-[var(--primary-color)] text-white rounded-lg"
          >
            Create Blog
          </button>
        </div>
      </div>
      <div>
        <div>
          <div className="p-4">
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              {loading ? (
                <>
                  <div className="flex justify-center items-center">
                    <Spinner />
                  </div>
                </>
              ) : (
                <>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Image
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {blogs &&
                        blogs.map((item) => (
                          <tr key={item?._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Image
                                width={200}
                                height={200}
                                src={item?.image}
                                alt={item?.title}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item?.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(item?.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              <div className="max-w-xs max-h-20 overflow-y-auto">
                                {item?.description}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-4">
                                <button
                                  onClick={() => {
                                    modaluRef.current?.showModal();
                                    setUpdateDataPass(item);
                                  }}
                                  className="bg-[var(--primary-color)] text-white p-[10px] rounded-lg cursor-pointer"
                                >
                                  <FiEdit className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => handelDelete(item._id)}
                                  className="bg-[var(--primary-color)] text-white p-[10px] rounded-lg cursor-pointer"
                                >
                                  <FiTrash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <dialog ref={modalRef} className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <BlogsForm />
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn bg-[var(--primary-color)] text-white">
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
          <dialog ref={modaluRef} className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <UpdateBlogsForm data={updateDataPass as TBlog} />
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn bg-[var(--primary-color)] text-white">
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
