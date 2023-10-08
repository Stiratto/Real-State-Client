import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { TbBuildingEstate } from "react-icons/tb";
import { useSelector } from "react-redux";

function Navbar() {
  const selectAuth = (state: any) => state.user;
  const { currentUser } = useSelector(selectAuth);

  return (
    <nav
      className="shadow-md flex max-[410px]:flex-col max-[410px]:space-y-4 min-[430px]:flex-row
    min-[430px]:space-y-0 items-center justify-between p-3 mx-auto"
    >
      <h1 className="font-bold text-sm sm:text-xl flex flex-wrap items-center gap-3">
        <TbBuildingEstate />
        stiratto
      </h1>
      <form className="bg-slate-100 p-2 rounded-lg flex items-center space-y-2">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none w-32 sm:w-64"
        />
        <FaSearch className="text-slate-500" />
      </form>
      <ol className="gap-4 flex flex-wrap">
        <li className="hover:underline hover:underline-offset-8 text-slate-700 ">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:underline hover:underline-offset-8  text-slate-700">
          <Link to="/about">About</Link>
        </li>

        {currentUser ? (
          <Link to="/profile">
            <img
              src={currentUser.avatar}
              alt="profile"
              className="rounded-full h-7 w-7 object-cover"
            ></img>
          </Link>
        ) : (
          <li className="hover:underline hover:underline-offset-8 text-slate-700">
            <Link to="/signin">Sign In</Link>
          </li>
        )}
      </ol>
    </nav>
  );
}

export default Navbar;
