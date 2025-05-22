"use client";

import Article from "@/components/Article";
import axios from "axios";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorImage: string;
  slug: string;
  createdAt: Date;
  imageUrl: string;
  author: {
    name: string;
    image: string;
  };
  _count: {
    comments: number;
    likes: number;
  };
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${query}`
    );
    setResults(res.data.blogs);
    console.log(res.data.blogs);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-4">Searching...</p>}

      <div className="mt-6 space-y-4">
        {results
          ? results.map((blog) => (
              <Article
                key={blog.id}
                authorId={blog?.authorId}
                content={blog?.content}
                slug={blog?.slug}
                authorName={blog?.author?.name}
                authorImage={blog?.author?.image}
                title={blog?.title}
                imageUrl={blog?.imageUrl}
                createdAt={blog?.createdAt}
                likeCount={blog?._count?.likes}
                commentCount={blog?._count?.comments}
              />
            ))
          : !loading && <p>No results found.</p>}
      </div>
    </div>
  );
}
