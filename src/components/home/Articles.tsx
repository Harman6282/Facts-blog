"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ArticlesShimmer from "../shimmer/ArticlesShimmer";
import Article from "../Article";

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
  createdAt: Date;
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
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`
        );
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

  if (loading) return <ArticlesShimmer />;

  return (
    <div className="w-full md:w-3/4 lg:w-2/3 px-6 md:px-10 p-4">
      {articles?.map((blog) => (
        <div key={blog?.id}>
          <Article
            authorId={blog?.authorId}
            content={blog?.content}
            slug={blog?.slug}
            authorName={blog?.author.name}
            authorImage={blog?.author.image}
            title={blog?.title}
            imageUrl={blog?.imageUrl}
            createdAt={blog?.createdAt}
            likeCount={blog?._count?.likes}
            commentCount={blog?._count?.comments}
          />
        </div>
      ))}
    </div>
  );
};

export default Articles;
