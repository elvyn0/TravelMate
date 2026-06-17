import React from "react";

function Footer() {
  const today = new Date();
  return (
    <div className="fixed bottom-1 w-full">
      <div className="">
        <hr className="text-gray-500" />
        <p className=" text-sm text-center">
          Copyright&copy; {today.getFullYear()}@scenicwonders.dev - All Right Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
