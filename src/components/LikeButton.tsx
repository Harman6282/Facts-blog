import { Heart } from 'lucide-react'
import React from 'react'

const LikeButton = ({likeCount}: {likeCount: number}) => {
  return (
    <>
         <p className="flex items-center gap-1">
            {" "}
            <Heart size={18} className="cursor-pointer"/> {likeCount || 0}
          </p>
    </>
  )
}

export default LikeButton