"use client";
import axios from "axios";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Author = {
  id: string;
  name: string;
  email: string;
  image: string;
};

type Article = {
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

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
        setArticles(res.data.blogs);
        setLoading(false);
        console.log(res.data.blogs);
      } catch (error) {
        toast.error("Failed to fetch articles");
        console.log(error);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p>Loading articles...</p>;

  return (
    <div className="w-full md:w-3/4 lg:w-2/3 px-6 md:px-10 p-4">
      {articles?.map((blog) => (
        <div key={blog.id} className="flex items-center justify-between">
          <div className={blog?.imageUrl ? "w-3/4" : "w-full"}>
            <p className="text-sm inline-block mb-2 text-gray-500 ">
              <Link
                href={`/profile/${blog?.authorId}`}
                className="flex items-center gap-2"
              >
                <Image
                  src={blog.author.image}
                  alt="user Image"
                  width={22}
                  height={22}
                  className="rounded-full cursor-pointer object-cover"
                />
                <span className=" text-black cursor-pointer hover:underline">
                  {" "}
                  {blog?.author.name}{" "}
                </span>
              </Link>
            </p>
            <Link href={`/blog/${blog.slug}`}>
              <h2 className="text-2xl font-bold cursor-pointer hover:underline ">
                {blog.title}
              </h2>
            </Link>
            <p className="text-gray-600 line-clamp-2">{blog.content}</p>
            <div className="text-sm text-gray-500 mt-3 flex items-center gap-4">
              <span>
                {" "}
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <p className="flex items-center gap-1">
                {" "}
                <Heart size={16} fill="#6a7282" /> {blog?._count?.likes || 0}
              </p>
              <p className="flex items-center gap-1">
                {" "}
                <MessageCircle fill="#6a7282" size={16} />
                {blog?._count?.comments || 0}
              </p>
            </div>
            <hr className="my-4" />
          </div>

          {blog?.imageUrl && (
            <div>
              <Image
                src={blog?.imageUrl}
                alt="blog Img"
                width={160}
                height={107}
              ></Image>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Articles;
