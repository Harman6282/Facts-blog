// components/CommentDialog.tsx

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  _id: string
  text: string
  createdAt: string
}

export default function CommentDialog({ blogId , isCommentsOpen, setIsCommentsOpen }: { blogId: string; isCommentsOpen: boolean; setIsCommentsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch comments on open
  useEffect(() => {
    if (isCommentsOpen) {
      fetchComments()
    }
  }, [isCommentsOpen])

  const fetchComments = async () => {
    // setLoading(true)
   
    // setLoading(false)
  }

  const handleSubmit = async () => {
    if (!comment.trim()) return
  
  }

  return (
    <>
      <Dialog open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {loading ? (
              <p className="text-muted-foreground">Loading comments...</p>
            ) : comments.length > 0 ? (
              comments.map((c) => (
                <div key={c._id} className="border rounded-xl p-3 bg-muted">
                  <p className="text-sm">{c.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
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
              <Button variant="ghost" onClick={() => setIsCommentsOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={!comment.trim()}>Post Comment</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
