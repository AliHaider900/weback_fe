import Link from "next/link";
import React from "react";
import { IoMenu } from "react-icons/io5";
import { MdOutlineNotifications } from "react-icons/md";

function Navbar() {
  return (
    <nav className="py-6 px-6">
      <div className="flex items-center justify-between">
        <IoMenu size={24} />
        <Link href="/">
          <h1 className="font-extrabold text-sm tracking-[0.0625em]">WEBACK</h1>
        </Link>
        <MdOutlineNotifications size={24} />
      </div>
    </nav>
  );
}

export default Navbar;
