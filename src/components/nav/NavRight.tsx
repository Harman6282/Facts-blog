import { SearchIcon, User } from 'lucide-react'
import React from 'react'

const NavRight = () => {
  return (
     <div className="flex items-center space-x-4">
        {/* Mobile Search Icon */}
        <div className=" cursor-pointer md:hidden">
          <SearchIcon size={24} />
        </div>

        {/* Profile Icon */}
        <div className="text-gray-700 cursor-pointer bg-gray-200 rounded-full p-1 md:p-2 ">
          <User size={24} />
        </div>
      </div>
  )
}

export default NavRight