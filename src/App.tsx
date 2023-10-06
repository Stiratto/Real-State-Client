import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
      </Routes>
    </div>
  );
}
