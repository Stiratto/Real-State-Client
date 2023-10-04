import { Routes, Route } from "react-router-dom";
import About from "./pages/about";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignUp";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signout" element={<SignOut />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
    </Routes>
  );
}
