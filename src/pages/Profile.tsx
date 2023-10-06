import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-app-b87a0.firebaseapp.com",
  projectId: "real-estate-app-b87a0",
  storageBucket: "real-estate-app-b87a0.appspot.com",
  messagingSenderId: "491078279978",
  appId: "1:491078279978:web:b70fc7f25f0f9c8b2cb453",
};

const app: FirebaseApp = initializeApp(firebaseConfig);

function Profile() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const selectAuth = (state: any) => state.user;
  const { currentUser } = useSelector(selectAuth);
  const [file, setFile] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({ avatar: currentUser.avatar });

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file: any) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        error;
      },
      () => {
        // Cuando la carga está completa, obtén la URL de descarga
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          setImgPerc(100); // Establece el progreso en 100% cuando está completo
        });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <form className="flex flex-col gap-5">
        <input
          onChange={(ev: any) => {
            setFile(ev.target.files[0]);
          }}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        ></input>
        <div className="flex flex-col">
          <p className="text-sm text-gray-400 text-center mb-2">
            * Image must be less than 2MB and it should be a valid image.
          </p>
          <img
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            onClick={() => {
              fileRef.current?.click();
            }}
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center my-2"
          ></img>
        </div>
        <p className="text-center text-sm">
          {fileUploadError ? (
            <span className="text-red-700">
              There was an error uploading the image, try again.
              <br />
            </span>
          ) : imgPerc > 0 && imgPerc < 100 ? (
            <span className="text-green-700">Uploading {imgPerc}%</span>
          ) : imgPerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>

      <div className="my-5 flex justify-between">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
