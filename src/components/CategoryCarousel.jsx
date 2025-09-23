import React, { useState, useEffect } from "react";

export default function CategoryCarousel({ title, images }) {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  console.log("loading:", loading);
  const [isOpen, setIsOpen] = useState(false); // ✅ new state for fullscreen modal

  const prev = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);

  // Trigger loading when index changes
  useEffect(() => {
    setLoading(true);
  }, [index]);

  return (
    <>
      <section
        id="section1"
        className="relative border-2 border-[#A47B2D] shadow-lg rounded-xl overflow-hidden bg-white text-[#A47B2D]"
      >
        {/* Image container */}
        <div className="relative w-full bg-[#fad9d2] flex items-center justify-center">
          {/* Image */}
          <img
            src={images[index]}
            alt={title}
            onClick={() => setIsOpen(true)} // ✅ open fullscreen on click
            className={`w-full h-auto object-contain transition-opacity duration-300 cursor-pointer ${
              loading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setLoading(false)}
          />

          {/* Loading Spinner */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60">
              <div className="w-10 h-10 border-4 border-[#A47B2D] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Controls (overlay) */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#A47B2D]/70 text-white p-3 rounded-full text-3xl hover:bg-[#A47B2D] transition"
          >
            ›
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#A47B2D]/70 text-white p-3 rounded-full text-3xl hover:bg-[#A47B2D] transition"
          >
            ‹
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-2 right-2 bg-[#A47B2D] text-white px-3 py-1 rounded-md text-lg font-semibold">
            {title}
          </div>
        </div>
      </section>

      {/* ✅ Fullscreen modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white text-4xl font-bold hover:text-[#A47B2D]"
          >
            ✕
          </button>

          <img
            src={images[index]}
            alt={title}
            className="max-w-[90%] max-h-[90%] object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  );
}
