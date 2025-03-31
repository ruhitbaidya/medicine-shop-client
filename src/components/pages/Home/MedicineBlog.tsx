"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TBlog } from "@/app/types/medicinestype";
import { getApi } from "@/components/api/apiCom";

const MedicineBlogSection = () => {
  const [blogs, setBlogs] = useState<TBlog[] | []>([]);
  const [loading, setLoading] = useState(false);
  const getBlogs = async () => {
    const res = await getApi(
      `${process.env.NEXT_PUBLIC_API_URL}/get-all-blogs`
    );
    if (res.data.length > 0) {
      setLoading(false);
      setBlogs(res.data);
    }
    console.log(res);
  };

  const dateCon = (date: string) => {
    const dates = new Date(date);
    return dates.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const mySkelaton = Array(3)
    .fill(0)
    .map((_, idx) => (
      <>
        <div key={idx} className="flex  flex-col gap-4">
          <div className="skeleton h-32 "></div>
          <div className="skeleton h-4 "></div>
          <div className="skeleton h-4"></div>
          <div className="skeleton h-4 "></div>
        </div>
      </>
    ));
  useEffect(() => {
    setLoading(true);
    getBlogs();
  }, []);
  return (
    <section className="py-7 bg-[var(--background-color)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 text-sm font-semibold text-[var(--primary-color)] bg-[var(--primary-light)] rounded-full mb-4">
            Health Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-3">
            Latest{" "}
            <span className="text-[var(--primary-color)]">Medical Blogs</span>
          </h2>
          <p className="text-lg text-[var(--secondary-color)] max-w-2xl mx-auto">
            Expert advice and research updates for better health decisions
          </p>
        </div>
        {loading && (
          <div className="grid grid-cols-3 gap-[25px]">{mySkelaton}</div>
        )}
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs &&
            blogs.slice(0, 3).map((post) => (
              <motion.div
                key={post._id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              >
                {/* Blog Image */}
                <div className="relative h-48 bg-gray-100">
                  <Image
                    height={200}
                    width={200}
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-[var(--secondary-color)] mb-4">
                    <div className="flex items-center mr-4">
                      <FaCalendarAlt className="mr-1.5" />
                      <span>{dateCon(post.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <FaUser className="mr-1.5" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--text-color)] mb-3">
                    {post.title}
                  </h3>
                  <p className="text-[var(--secondary-color)] mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/blog/${post._id}`}
                      className="flex items-center text-[var(--primary-color)] hover:text-[var(--hover-color)] transition-colors"
                    >
                      Read More <FaArrowRight className="ml-1.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="px-[45px] py-[15px] bg-[var(--primary-color)]  text-white font-medium rounded-lg transition-colors"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MedicineBlogSection;
