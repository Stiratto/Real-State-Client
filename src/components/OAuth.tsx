import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-app-b87a0.firebaseapp.com",
  projectId: "real-estate-app-b87a0",
  storageBucket: "real-estate-app-b87a0.appspot.com",
  messagingSenderId: "491078279978",
  appId: "1:491078279978:web:b70fc7f25f0f9c8b2cb453",
};

const app: FirebaseApp = initializeApp(firebaseConfig);

const OAuth = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigateTo("/");
    } catch (err) {
      console.log("Could not sign in with google", err);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="flex items-center justify-center gap-3 bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
    >
      Sign in with google
      <FcGoogle />
    </button>
  );
};

export default OAuth;
