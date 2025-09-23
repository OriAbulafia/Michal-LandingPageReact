import { readFileSync } from "fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Load service account key JSON (download from Firebase Console → Project Settings → Service Accounts)
const serviceAccount = JSON.parse(readFileSync("./michal-landingpage-firebase-adminsdk-fbsvc-6c8f6ea5cf.json"));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// Load your categories JSON
const data = JSON.parse(readFileSync("./categories.json", "utf8"));

async function upload() {
  const categories = data.categories;
  for (const [key, value] of Object.entries(categories)) {
    await db.collection("categories").doc(key).set(value);
    console.log(`Uploaded: ${key}`);
  }
}

upload();
