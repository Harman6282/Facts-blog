"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ArticlesShimmer from "../shimmer/ArticlesShimmer";
import Article from "../Article";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const endpoint = query
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${query}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`;

        const res = await axios.get(endpoint);
        setArticles(res.data.blogs);
      } catch (error) {
        toast.error("Failed to fetch articles");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query]);

  if (loading) return <ArticlesShimmer />;

  return (
    <div className="w-full md:w-3/4 lg:w-2/3 px-6 md:px-10 p-4">
      {query && articles.length === 0 && (
        <p className="text-center text-gray-500">No results for “{query}”.</p>
      )}

      {articles?.map((blog) => (
        <div key={blog.id}>
          <Article
            authorId={blog.authorId}
            content={blog.content}
            slug={blog.slug}
            authorName={blog.author.name}
            authorImage={blog.author.image}
            title={blog.title}
            imageUrl={blog.imageUrl}
            createdAt={blog.createdAt}
            likeCount={blog._count?.likes}
            commentCount={blog._count?.comments}
          />
        </div>
      ))}
    </div>
  );
};

export default Articles;
