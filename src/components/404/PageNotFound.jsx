import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const PageNotFound = () => {
  return (
    <div class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <img
        src="https://cdn.prod.website-files.com/66bcc6176bc9596c06805bd7/66c18811955d1df2716711d6_Group%204.svg"
        className="absolute top-10 w-20 opacity-50 shining-effect"
        alt="Shining effect"
      />
      <h1 class="text-9xl font-extrabold text-white tracking-widest ">404</h1>
      <div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute shining-effect">
        Page Not Found
      </div>
      <button class="mt-5">
        <a class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
          <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
            <Link to="/">Go Home</Link>
          </span>
        </a>
      </button>
    </div>
  );
};

export default PageNotFound;
