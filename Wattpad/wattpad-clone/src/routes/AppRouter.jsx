import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Profile from "../pages/Profile";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Genre from "../pages/Genre";
import Story from "../pages/Story";
import ReaderLayout from "../layouts/ReaderLayout";
import Search from "../pages/Search";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/genre/:genreName" element={<Genre />} />
        <Route path="/search" element={<Search />} />


        <Route
  path="/profile"
  element={
    <>
      <Navbar />
      <Profile />
    </>
  }
/>



        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/story/:id"
          element={
            <>
              <Navbar />
              <Story />
            </>
          }
        />

        <Route path="/read/:id" element={<ReaderLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
