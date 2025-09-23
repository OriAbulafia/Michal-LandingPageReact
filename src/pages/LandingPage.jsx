import { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Video from "../components/Video";
import Hero from "../components/Hero";
import CategoryCarousel from "../components/CategoryCarousel";
import About from "../components/About";
import Footer from "../components/Footer";
import { fetchCategories } from "../data/categories";
import { Link } from "react-router-dom"; // ✅ Make sure you're using react-router

export default function LandingPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchCategories();
        console.log("Fetched categories:", data); // debug
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#fad9d2]">
        <div className="w-12 h-12 border-4 border-[#A47B2D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div dir="rtl" className="bg-[#fad9d2] font-sans relative min-h-screen">
      <Header />
      <Navbar />
      <Video />
      <Hero />

      <main className="max-w-6xl mx-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {categories.map((cat) => (
          <CategoryCarousel
            key={cat.id}
            title={cat.title}
            images={cat.images.map((img) => img.url)} // pass array of URLs
          />
        ))}
      </main>

      <About />
      <Footer />

      {/* ✅ Floating Admin Link */}
      <Link
        to="/admin"
        className="fixed bottom-6 right-6 bg-[#A47B2D] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#8b6926] transition"
      >
        ניהול
      </Link>
    </div>
  );
}
