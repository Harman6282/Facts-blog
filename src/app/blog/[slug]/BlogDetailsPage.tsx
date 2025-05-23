"use client";
import LikeButton from "@/components/LikeButton";
import BlogDetailsShimmer from "@/components/shimmer/BlogDetailsShimmer";
import axios from "axios";
import { MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import CommentDialog from "@/components/Comment";

type Author = {
  id: string;
  name: string;
  email: string;
  image: string;
};
type BlogData = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  likes: string[];
  comments: string[];
  tags: string[];
  isPublished: boolean;
  authorId: string;
  author: Author;
  createdAt: string;
  _count: {
    likes: number;
    comments: number;
  };
};

const BlogDetailsPage = ({ slug }: { slug: string }) => {
  const [blog, setBlog] = useState<BlogData>();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [initiallyLiked, setInitiallyLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`
      );

      setBlog(res.data.blog);
      setIsLoading(false);
      setInitiallyLiked(res?.data?.blog?._count?.likes);
      if (!session?.user) setInitiallyLiked(false);
      console.log(res.data.blog);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  if (isLoading) return <BlogDetailsShimmer />;

  return (
    blog && (
      <>
        <div className="w-full lg:w-2/3 mx-auto px-6 md:px-10 mt-6">
          <h1 className="text-4xl lg:text-[42px] font-bold mb-4 text-[#242424]">
            {blog?.title}
          </h1>
          <p className="text-md inline-block my-2 text-gray-500 ">
            <Link
              href={`/profile/${blog?.author?.id}`}
              className="flex items-center gap-2"
            >
              <Image
                src={blog?.author?.image}
                alt="user Image"
                width={22}
                height={22}
                className="rounded-full cursor-pointer object-cover"
              />
              <span className=" text-black cursor-pointer hover:underline">
                {" "}
                {blog?.author?.name}{" "}
              </span>
            </Link>
          </p>
          <div className="text-sm text-gray-500 my-5 mb-7 flex items-center gap-4">
            <span>
              {" "}
              {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            <LikeButton
              likeCount={blog?._count?.likes}
              userId={userId as string}
              blogId={blog?.id}
              initiallyLiked={initiallyLiked}
            />
            <p className="flex items-center gap-1">
              {" "}
              <MessageCircle
                fill="#6a7282"
                size={18}
                className="cursor-pointer"
                onClick={() => setIsCommentsOpen(!isCommentsOpen)}
              />
              {blog?._count?.comments || 0}
            </p>
          </div>

          {blog.imageUrl && (
            <Image
              src={blog?.imageUrl}
              alt="blog image"
              width={750}
              height={400}
            />
          )}

          <div
            className="prose max-w-none text-gray-700 py-5"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.content),
            }}
          />
        </div>
        <CommentDialog
          blogId={blog?.id as string}
          isCommentsOpen={isCommentsOpen}
          setIsCommentsOpen={setIsCommentsOpen}
          authorId={userId as string}
        />
      </>
    )
  );
};

export default BlogDetailsPage;
