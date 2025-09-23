import React from "react";

export default function Hero() {
  return (
    <article className="text-center py-10 px-4">
      <h1 className="text-4xl md:text-5xl text-[#A47B2D] font-bold mb-4">
        מיכל אבולעפיה אמנית איפור
      </h1>
      <p className="text-xl md:text-2xl mb-6 leading-relaxed">
        איפור כלה, איפור לאירועים, איפור להפקות,
        <br />
        איפור קבוע, עיצוב גבות, ציורי פנים וגוף
        <br />
        אני כאן בשבילך❣️
      </p>

      <a
        href="https://api.whatsapp.com/send?phone=972542585006&text="
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#A47B2D] text-white py-3 px-6 rounded-lg shadow hover:shadow-xl transition"
      >
        לתיאום פגישה
      </a>
    </article>
  );
}
