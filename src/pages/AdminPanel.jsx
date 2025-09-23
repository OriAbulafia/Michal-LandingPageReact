import React, { useEffect, useState, useRef } from "react";
import { db, auth } from "../firebase"; // ✅ make sure firebase.js exports db + auth
import { signOut } from "firebase/auth";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ✅ Sortable image component
function SortableImage({ img, index, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        <img
          src={img.url}
          alt=""
          className="w-full h-full object-cover rounded shadow"
        />
        <button
          onClick={(e) => {
            e.stopPropagation(); // ✅ Prevent drag interference
            e.preventDefault();
            onDelete(index);
          }}
          className="absolute top-1 right-1 bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full px-1.5 py-0.5 text-xs"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [activeUploadCat, setActiveUploadCat] = useState(null);

  const fileInputRef = useRef(null);

  // ✅ Fetch categories from Firestore
  useEffect(() => {
    async function loadCategories() {
      const snap = await getDocs(collection(db, "categories"));
      const cats = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(cats);
    }
    loadCategories();
  }, []);

  // ✅ dnd-kit sensors
  const sensors = useSensors(useSensor(PointerSensor));

  // ✅ Drag and Drop reorder
  const handleDragEnd = async (event, catId) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const category = categories.find((c) => c.id === catId);
    const reordered = arrayMove(category.images, active.id, over.id);

    const updatedImages = reordered.map((img, i) => ({
      ...img,
      order: i,
    }));

    await updateDoc(doc(db, "categories", catId), { images: updatedImages });

    setCategories((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, images: updatedImages } : c))
    );
  };

  // ✅ Delete image
  const handleDelete = async (catId, index) => {
    const category = categories.find((c) => c.id === catId);
    const updatedImages = category.images.filter((_, i) => i !== index);

    await updateDoc(doc(db, "categories", catId), { images: updatedImages });

    setCategories((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, images: updatedImages } : c))
    );
  };

  // ✅ Upload new image (Cloudinary)
  const handleUploadImage = async (catId, file) => {
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (!data.secure_url) throw new Error("Cloudinary upload failed");

      const url = data.secure_url;
      const category = categories.find((c) => c.id === catId);
      const updatedImages = [
        ...category.images,
        { url, order: category.images.length },
      ];

      await updateDoc(doc(db, "categories", catId), { images: updatedImages });

      setCategories((prev) =>
        prev.map((c) => (c.id === catId ? { ...c, images: updatedImages } : c))
      );
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
      setActiveUploadCat(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <div className="p-6 space-y-6">
      {/* ✅ Top bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded text-sm"
          >
            התנתקות
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#A47B2D] text-white px-4 py-2 rounded text-sm"
          >
            צפה בדף
          </a>
        </div>

        <h1 className="text-3xl font-bold text-[#A47B2D] text-right">
          ניהול תמונות
        </h1>
      </div>

      {/* ✅ Categories */}
      {categories.map((cat) => (
        <div key={cat.id} className="border rounded-lg bg-white shadow">
          {/* Header */}
          <div
            className="flex justify-between items-center p-4 bg-[#A47B2D]/50 cursor-pointer"
            onClick={() =>
              setOpenCategory(openCategory === cat.id ? null : cat.id)
            }
          >
            <span className="text-lg">
              {openCategory === cat.id ? "▲" : "▼"}
            </span>
            <h2 className="text-xl font-semibold">{cat.title}</h2>
          </div>

          {/* Expandable content */}
          {openCategory === cat.id && (
            <div className="p-4 space-y-4">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(e) => handleDragEnd(e, cat.id)}
              >
                <SortableContext
                  items={cat.images.map((_, i) => i)}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className="flex flex-wrap gap-4">
                    {cat.images
                      .sort((a, b) => a.order - b.order)
                      .map((img, idx) => (
                        <SortableImage
                          key={idx}
                          img={img}
                          index={idx}
                          onDelete={(i) => handleDelete(cat.id, i)}
                        />
                      ))}
                  </div>
                </SortableContext>
              </DndContext>

              {/* Upload button */}
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setActiveUploadCat(cat.id);
                    fileInputRef.current.click();
                  }}
                  className="bg-[#A47B2D] text-white px-4 py-2 rounded text-sm"
                >
                  {uploading && activeUploadCat === cat.id
                    ? "...מעלה"
                    : "העלה תמונה חדשה"}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* ✅ Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => handleUploadImage(activeUploadCat, e.target.files[0])}
      />
    </div>
  );
}
