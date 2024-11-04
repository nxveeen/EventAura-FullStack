import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="relative flex w-full h-auto py-10">
        <div className="absolute inset-0 blur-lg w-full bg-gray-300 "></div>
        <div className="relative flex justify-between w-full px-10">
          <div className="flex flex-col">
            <p
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-xl font-medium hover:cursor-pointer"
            >
              EventAura
            </p>
            <span className="block bg-gray-500 w-[180px] h-[2px] mt-1 mb-2"></span>
            <Link to="">About Us</Link>
            <Link to="">Contact</Link>
            <Link to="">FAQ</Link>
            <Link to="">Blog</Link>
          </div>
          <div className="flex gap-3">
            <Facebook
              strokeWidth={1}
              height={20}
              width={20}
              className="hover:cursor-pointer"
            />
            <Twitter
              strokeWidth={1}
              height={20}
              width={20}
              className="hover:cursor-pointer"
            />
            <Instagram
              strokeWidth={1}
              height={20}
              width={20}
              className="hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
