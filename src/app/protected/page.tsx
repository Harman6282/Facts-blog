"use client"
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import React from 'react'

const Page = () => {
    const session =  useSession();

    if(!session){
        redirect('/')
    }
  return (
    <div>
      <h1 className='font-mono'>Protected Page</h1>

      
    </div>
  )
}

export default Page
