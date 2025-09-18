import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DOMPurify from "dompurify";

const Article = ({
  authorId,
  content,
  slug,
  authorName,
  authorImage,
  title,
  imageUrl,
  createdAt,
  likeCount,
  commentCount,
}: {
  authorId: string;
  content: string;
  slug: string;
  authorName: string;
  authorImage: string;
  title: string;
  imageUrl: string;
  createdAt: Date;
  likeCount: number;
  commentCount: number;
}) => {
  return (
    <div className="flex items-start justify-between ">
      <div className={imageUrl ? "w-3/4" : "w-full"}>
        <p className="text-sm inline-block mb-2 text-gray-500 ">
          <Link
            href={`/profile/${authorId}`}
            className="flex items-center gap-2"
          >
            <Image
              src={authorImage}
              alt="user Image"
              width={22}
              height={22}
              className="rounded-full cursor-pointer object-cover"
            />
            <span className=" text-black cursor-pointer hover:underline">
              {" "}
              {authorName}{" "}
            </span>
          </Link>
        </p>
        <Link href={`/blog/${slug}`}>
          <h2 className="text-lg md:text-2xl font-bold cursor-pointer hover:underline ">
            {title}
          </h2>

          <div
            className="max-w-none text-gray-700 py-5 line-clamp-1"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content),
            }}
          />
          <div className="text-sm text-gray-500 mt-3 flex items-center gap-4">
            <span>
              {" "}
              {new Date(createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            <p className="flex items-center gap-1">
              {" "}
              <Heart size={16} fill="#6a7282" /> {likeCount || 0}
            </p>
            <p className="flex items-center gap-1">
              {" "}
              <MessageCircle fill="#6a7282" size={16} />
              {commentCount || 0}
            </p>
          </div>
          <hr className="my-4" />
        </Link>
      </div>

      {imageUrl && (
        <Link href={`/blog/${slug}`}>
          <Image
            src={imageUrl}
            alt="blog Img"
            className="pt-10 "
            width={130}
            height={10}
          />
        </Link>
      )}
    </div>
  );
};

export default Article;
