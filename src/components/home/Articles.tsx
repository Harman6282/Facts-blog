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
  coverImage: string;
  likes: string[];
  comments: string[];
  tags: string[];
  isPublished: boolean;
  authorId: string;
  author: Author;
  createdAt: string;
};

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/blogs");
        setArticles(res.data.blogs);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch articles");
        console.log(error);
      }
    };

    fetchArticles();
  }, []);



  if (loading) return <p>Loading articles...</p>;

  return (
    <div className="w-full md:w-3/4 lg:w-2/3 px-6 md:px-10 p-4 mt-4 ">
      {articles?.map((blog) => (
        <div key={blog.id}>
          <p className="text-sm inline-block mb-2 text-gray-500 ">
            <Link href={`/profile/${blog?.authorId}`} className="flex items-center gap-2">
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
              <Heart size={18} /> {blog.likes?.length || 0}
            </p>
            <p className="flex items-center gap-1">
              {" "}
              <MessageCircle fill="#6a7282" size={18} />
              {blog.comments?.length || 0}
            </p>
          </div>
          <hr className="my-4" />
        </div>
      ))}
    </div>
  );
};

export default Articles;
