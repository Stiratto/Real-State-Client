import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
} from "../../redux/user/userSlice";

import { useDispatch } from "react-redux";

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

  const { currentUser, loading, error } = useSelector(selectAuth);

  const [file, setFile] = useState(null);

  const [imgPerc, setImgPerc] = useState(0);

  const [fileUploadError, setFileUploadError] = useState(false);

  const [formData, setFormData] = useState({ avatar: currentUser.avatar });

  const dispatch = useDispatch();

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [confirmDeleteMessage, setConfirmDeleteMessage] = useState(false);

  // console.log(formData);

  const navigateTo = useNavigate();

  // If avatar is updated, then change the previous avatar for the updated one
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // Handle profile avatar upload

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
        // When the load is completed, get the download url
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          setImgPerc(100);
        });
      }
    );
  };

  // Handle inputs changes

  const handleChange = (ev: any) => {
    setFormData({ ...formData, [ev.target.id]: ev.target.value });
  };

  // Handle upload form  submit

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (err: any) {
      dispatch(updateUserFailure(err.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
      navigateTo("/signin");
    } catch (err: any) {
      dispatch(deleteUserFailure(err.message));
    }
  };

  const confirmDelete = () => {
    setConfirmDeleteMessage(true);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
            referrerPolicy="no-referrer"
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
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          id="password"
          className="border p-3 rounded-lg"
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>

      <div className="my-5 flex justify-between">
        <div className="">
          <span
            onClick={confirmDelete}
            className="text-red-700 cursor-pointer flex flex-col gap-5"
          >
            {confirmDeleteMessage ? (
              <span onClick={handleDeleteUser} className="">
                You sure you want to delete this account?
                <br /> This action is not reversible.
              </span>
            ) : (
              <></>
            )}
            Delete account
          </span>
        </div>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>

      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-600">
        {updateSuccess ? "Profile updated succesfully." : ""}
      </p>
    </div>
  );
}

export default Profile;
