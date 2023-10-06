import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import("@reduxjs/toolkit");
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice.js";
import { useSelector } from "react-redux";
import OAuth from "../components/OAuth.js";

function signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state: any) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [ev.target.id]: ev.target.value,
    });
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigateTo("/");
    } catch (err: any) {
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <div className="w-full">
      <img
        src="https://na.rdcpix.com/cec41a70824da0c2291f9311480405bdw-c2736617928srd_q80.jpg"
        className="w-screen h-96  object-cover   bg-contain"
      ></img>

      <div className="p-3 max-w-lg mx-auto bg-fixed">
        <h1 className="text-3xl text-center font-semibold my-7 ">Sign In</h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email..."
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password..."
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          <button
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>

          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Dont have an account? </p>
          <Link to="/signup">
            <span className="text-blue-600">Sign Up</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}

export default signin;
