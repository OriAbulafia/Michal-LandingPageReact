import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function fetchCategories() {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const categories = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // ✅ sort by order field
  return categories.sort((a, b) => a.order - b.order);
}
