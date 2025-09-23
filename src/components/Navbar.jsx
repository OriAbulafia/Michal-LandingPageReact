import React from "react";

export default function Navbar() {
  return (
    <nav className="hidden md:flex justify-center gap-6 text-[#A47B2D] font-bold text-lg flex-wrap">
      {/* Internal links (same page scroll) */}
      <a href="#section1" className="hover:underline">העבודות שלי</a>
      <a href="#about" className="hover:underline">אודות</a>

      {/* External links (open in new tab) */}
      <a
        href="https://www.instagram.com/michalabulafia/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        האינסטגרם שלי
      </a>
      <a
        href="https://www.facebook.com/michal.abulafia.35"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        הפייסבוק שלי
      </a>
      <a
        href="https://www.tiktok.com/@michal.abulafia"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        הטיקטוק שלי
      </a>
      <a
        href="https://api.whatsapp.com/send?phone=972542585006&text="
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        תיאום פגישה
      </a>
    </nav>
  );
}
