import React, { useEffect, useState, useRef } from "react";
import { db, auth } from "../firebase"; // ✅ make sure auth is exported from firebase.js
import { signOut } from "firebase/auth";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function AdminPage() {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [activeUploadCat, setActiveUploadCat] = useState(null);

  const fileInputRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    async function loadCategories() {
      const snap = await getDocs(collection(db, "categories"));
      const cats = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(cats);
    }
    loadCategories();
  }, []);

  // Handle drag & drop reorder
  const handleDragEnd = async (result, catId) => {
    if (!result.destination) return;
    const category = categories.find((c) => c.id === catId);
    const reordered = Array.from(category.images);

    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    const updatedImages = reordered.map((img, i) => ({
      ...img,
      order: i,
    }));

    await updateDoc(doc(db, "categories", catId), { images: updatedImages });

    setCategories((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, images: updatedImages } : c))
    );
  };

  // Handle delete
  const handleDelete = async (catId, index) => {
    const category = categories.find((c) => c.id === catId);
    const updatedImages = category.images.filter((_, i) => i !== index);

    await updateDoc(doc(db, "categories", catId), { images: updatedImages });

    setCategories((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, images: updatedImages } : c))
    );
  };

  // Handle upload
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

      if (!data.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

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

  // Handle logout
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login"; // redirect to login page
  };

  return (
    <div className="p-6 space-y-6">
      {/* ✅ Top-left toolbar */}
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
              <DragDropContext
                onDragEnd={(result) => handleDragEnd(result, cat.id)}
              >
                <Droppable droppableId={cat.id} direction="horizontal">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex gap-4 overflow-x-auto"
                    >
                      {cat.images
                        .sort((a, b) => a.order - b.order)
                        .map((img, idx) => (
                          <Draggable
                            key={idx.toString()}
                            draggableId={`${cat.id}-${idx}`}
                            index={idx}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="relative"
                              >
                                <img
                                  src={img.url}
                                  alt=""
                                  className="w-32 h-32 object-cover rounded"
                                />
                                <button
                                  onClick={() => handleDelete(cat.id, idx)}
                                  className="absolute top-1 right-1 bg-black text-white rounded-full px-2 py-1 text-xs"
                                >
                                  ✕
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {/* Upload button inside dropdown */}
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
