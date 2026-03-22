// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "webgenai-e3456.firebaseapp.com",
  projectId: "webgenai-e3456",
  storageBucket: "webgenai-e3456.firebasestorage.app",
  messagingSenderId: "354559434046",
  appId: "1:354559434046:web:e3566385cdc456da00606f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =  getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };