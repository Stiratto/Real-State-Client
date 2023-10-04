import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [ev.target.id]: ev.target.value,
    });
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(null);
      navigateTo("/signin");
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="w-full">
      <img
        src="https://static.rdc.moveaws.com/images/hero/default/2021-11/webp/hp-hero-desktop-xl.webp"
        className="w-screen h-96  object-cover   bg-contain"
      ></img>

      <div className="p-3 max-w-lg mx-auto bg-fixed">
        <h1 className="text-3xl text-center font-semibold my-7 ">Sign Up</h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username..."
            className="border p-3 rounded-lg"
            id="username"
            onChange={handleChange}
          />
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
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account? </p>
          <Link to="/signin">
            <span className="text-blue-600">Sign In</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}

export default SignUp;
