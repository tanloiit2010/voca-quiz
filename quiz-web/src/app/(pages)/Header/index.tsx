"use client";

import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold">
                Voca Quiz
              </div>
            </Link>
            <div className="flex items-center space-x-8">
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-2">
            John Doe
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
