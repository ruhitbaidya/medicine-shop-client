"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";

const MedicineBlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Antibiotic Resistance: A Growing Global Concern",
      excerpt:
        "Learn how misuse of antibiotics is creating superbugs and what you can do to help prevent this health crisis.",
      date: "May 15, 2024",
      author: "Dr. Sarah Johnson",
      category: "Antibiotics",
      readTime: "4 min read",
      image:
        "https://www.cadilapharma.com/ast/uploads/2023/07/21072023-1.1-Blog_immunity.jpg",
    },
    {
      id: 2,
      title: "The Complete Guide to Seasonal Allergy Medications",
      excerpt:
        "Compare antihistamines, decongestants, and other allergy relief options to find what works best for you.",
      date: "April 28, 2024",
      author: "Dr. Michael Chen",
      category: "Allergies",
      readTime: "6 min read",
      image:
        "https://www.wyndly.com/cdn/shop/articles/2df5db77e9e0a3c945ad623d77d062c953a564b5_500x.png?v=1705511807",
    },
    {
      id: 3,
      title: "Natural Alternatives to Pain Relief Medications",
      excerpt:
        "Explore evidence-based natural remedies that can complement or replace traditional pain medications.",
      date: "June 2, 2024",
      author: "Dr. Emily Wilson",
      category: "Pain Relief",
      readTime: "5 min read",
      image:
        "https://www.verywellhealth.com/thmb/SE5lUYICUdWR4OqlN3wzd7DhAm0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/VWH-Paige-McLaughlin-Natura-Pain-Relief-Herbs-Standard-20f690ae9d3a4fe994f76e24cf66343c.jpg",
    },
  ];

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

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            >
              {/* Blog Image */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-[var(--primary-color)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-[var(--secondary-color)] mb-4">
                  <div className="flex items-center mr-4">
                    <FaCalendarAlt className="mr-1.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUser className="mr-1.5" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[var(--text-color)] mb-3">
                  {post.title}
                </h3>
                <p className="text-[var(--secondary-color)] mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--secondary-color)]">
                    {post.readTime}
                  </span>
                  <Link
                    href={`/blog/${post.id}`}
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
            className="inline-flex items-center px-6 py-3 bg-[var(--primary-color)] hover:bg-[var(--hover-color)] text-white font-medium rounded-lg transition-colors"
          >
            View All Articles
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MedicineBlogSection;
