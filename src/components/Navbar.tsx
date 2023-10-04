import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <nav
      className="bg-slate-200 shadow-md flex max-[410px]:flex-col max-[410px]:space-y-4 min-[430px]:flex-row
    min-[430px]:space-y-0 items-center justify-between p-3 mx-auto"
    >
      <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
        <span className="text-slate-500">Menorsito</span>
        <span className="text-slate-700">States</span>
      </h1>
      <form className="bg-slate-100 p-2 rounded-lg flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none w-32 sm:w-64"
        />
        <FaSearch className="text-slate-500" />
      </form>
      <ol className="gap-4 flex flex-wrap">
        <li className="hover:underline text-slate-700 ">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:underline  text-slate-700">
          <Link to="/about">About</Link>
        </li>
        <li className="hover:underline  text-slate-700">
          <Link to="/signin">Sign In</Link>
        </li>
      </ol>
    </nav>
  );
}

export default Navbar;
