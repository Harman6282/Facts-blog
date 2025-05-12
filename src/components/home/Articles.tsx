"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  tags: string[];
  isPublished: boolean;
  authorId: string;
  author: string;
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
    <div className="space-y-6 w-1/2 px-10 p-4">
      {articles.map((blog) => (
        <div key={blog.id}>
          <h2 className="text-2xl font-bold">{blog.title}</h2>
          <p className="text-gray-600">{blog.content}</p>
          <p className="text-sm text-gray-500">By {blog.author}</p>
          <p className="text-sm text-gray-500">Published on {blog.createdAt}</p>
          <hr className="my-4" />
        </div>
      ))}
    </div>
  );
};

export default Articles;
