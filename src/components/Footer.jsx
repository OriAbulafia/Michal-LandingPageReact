import React from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer dir="rtl" className="text-center py-8 px-4">
      <a
        href="https://api.whatsapp.com/send?phone=972542585006&text="
        className="bg-[#A47B2D] text-white py-3 px-6 rounded-lg shadow hover:shadow-xl transition"
      >
        לתיאום פגישה
      </a>

      <p className="text-lg font-bold mt-10">לינקים לרשתות החברתיות שלי:</p>

      <div className="flex justify-center gap-6 mt-5">
        <a
          href="https://www.facebook.com/michal.abulafia.35"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
        >
          <FaFacebook className="w-10 h-10 text-[#4267B2]" />
        </a>
        <a
          href="https://www.instagram.com/michalabulafia/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
        >
          <FaInstagram className="w-10 h-10 text-pink-500" />
        </a>
        <a
          href="https://www.tiktok.com/@michal.abulafia"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
        >
          <FaTiktok className="w-10 h-10 text-black" />
        </a>
      </div>
    </footer>
  );
}
