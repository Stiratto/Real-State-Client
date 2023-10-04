import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="w-full">
      <img
        src="https://static.rdc.moveaws.com/images/hero/default/2021-11/webp/hp-hero-desktop-xl.webp"
        className="w-full  h-96 object-cover  bg-center"
      ></img>

      <div className="p-3 max-w-lg mx-auto bg-fixed">
        <h1 className="text-3xl text-center font-semibold my-7 ">Sign Up</h1>

        <form className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Username..."
            className="border p-3 rounded-lg"
            id="username"
          />
          <input
            type="email"
            placeholder="Email..."
            className="border p-3 rounded-lg"
            id="email"
          />
          <input
            type="password"
            placeholder="Password..."
            className="border p-3 rounded-lg"
            id="password"
          />
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Sign Up
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account? </p>
          <Link to="/signin">
            <span className="text-blue-600">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
