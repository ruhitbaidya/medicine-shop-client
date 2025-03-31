import { getApi } from "@/components/api/apiCom";
import SocialShareIcons from "@/utils/SocialShareIcons";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
export const metadata: Metadata = {
  title: "Blog Details",
  description: "RM-Corner Blogs Details Page",
};
interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  createdAt: string;
}

const BlogDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id);
  const res = await getApi(
    `${process.env.NEXT_PUBLIC_API_URL}/get-singal-blogs/${id}`
  );

  if (!res?.data) {
    return notFound();
  }
  const post: BlogPost = res?.data;
  // Mock data structure based on your example

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-96 w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center">
                <FaUser className="mr-2 text-[#4a54e1]" />
                {post.author}
              </span>
              <span className="flex items-center">
                <FaCalendarAlt className="mr-2 text-[#4a54e1]" />
                {formatDate(post.createdAt)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Description */}
            <div className="prose prose-lg text-gray-700 mb-8">
              <p className="whitespace-pre-line">{post.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 border-t pt-6">
              <SocialShareIcons
                title={post.title}
                description={post.description}
                imageUrl={post.image}
              />
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-gray-50 px-8 py-6 border-t">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                {post.author.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{post.author}</h3>
                <p className="text-sm text-gray-500">
                  Published on {formatDate(post.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
