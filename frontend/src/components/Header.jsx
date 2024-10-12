import React from 'react'
import { Search,User,} from 'lucide-react'
import { LuGithub } from "react-icons/lu";

const handleGithub = () => {
  window.open("https://github.com/preeeetham/GameOn", "_blank");
};

const handlelogin = () => {

}

const handleSignUp = () => {

}

export default function Header() {
  return (
    <header className="bg-[#151515] py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center m-2">
          <a href="/" className="text-3xl font-bold">GAMEON</a>
        </div>
        <div className="flex items-center space-x-4 flex-grow">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search games..."
              className="bg-[#3b3b3b] text-white rounded-full py-2 px-8 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div>
            <button className="font-semibold hover:underline hover:underline-offset-4">
              LOG IN
            </button>
          </div>
          <div>
            <button className="font-semibold hover:underline hover:underline-offset-4">
              SIGN UP
            </button>
          </div>
          <button  onClick={handleGithub} className="p-2 hover:bg-[#3b3b3b] rounded-full">
            <LuGithub size={20} />
          </button>
          <button className="p-2 hover:bg-[#3b3b3b] rounded-full ">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
