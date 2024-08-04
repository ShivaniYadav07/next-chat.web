import Link from "next/link";
import React from "react";

function Header(props) {
  return (
    <div className="flex items-center justify-between bg-blue-600 rounded-t-md h-16 w-full px-4">
    <div className="flex items-center text-white">
      <div className="text-green-500 mr-2">
        <i className="fa fa-circle" aria-hidden="true"></i>
      </div>
      <div className="text-lg font-semibold">{props.room}</div>
    </div>
    <div>
      <Link href="/">
        <div className="text-white text-2xl">
          <i className="fa fa-times-circle" aria-hidden="true"></i>
        </div>
      </Link>
    </div>
  </div>
  );
}

export default Header;
