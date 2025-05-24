import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface Comment {
  id: string;
  text: string;
  blogId: string;
  authorId: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
}

export default function CommentDialog({
  blogId,
  isCommentsOpen,
  setIsCommentsOpen,
  authorId,
}: {
  blogId: string;
  isCommentsOpen: boolean;
  setIsCommentsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  authorId: string;
}) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  const session = useSession();
  const user = session.data?.user;

  // Fetch comments on open
  useEffect(() => {
    if (isCommentsOpen) {
      fetchComments();
    }
  }, [isCommentsOpen]);

  const fetchComments = async () => {
    setLoading(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comment?blogId=${blogId}`
    );
    setComments(res.data.comments);
    console.log(res.data.comments);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!user?.id)
      return toast.error("You must be logged in to comment", {
        action: {
          label: "Sign in",
          onClick: () => redirect("/signin"),
        },
      });
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comment`,
        { text: comment, blogId, authorId }
      );
      fetchComments();
      setComment("");
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to post comment");
    }
  };

  return (
    <>
      <Dialog open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
            <DialogDescription>
              Read what others have said and share your thoughts.
            </DialogDescription>
          </DialogHeader>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {loading ? (
              <p className="text-muted-foreground">Loading comments...</p>
            ) : comments ? (
              comments.map((c) => (
                <div key={c.id} className=" border-b p-3 ">
                  <div className="flex gap-2 items-start">
                    <Image
                      className="rounded-full"
                      src={c.author.image}
                      alt="author image"
                      width={26}
                      height={26}
                    />

                    <div>
                      <p>{c.author.name}</p>
                      <p className="text-sm">{c.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(c.createdAt).toDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No comments yet.</p>
            )}
          </div>

          {/* Comment Textarea */}
          <div className="mt-4 space-y-2">
            <Textarea
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsCommentsOpen(false)}>
                Cancel
              </Button>
              <Button
                className="cursor-pointer"
                onClick={handleSubmit}
                disabled={!comment}
              >
                Post Comment
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
