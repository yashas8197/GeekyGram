import "bootstrap-icons/font/bootstrap-icons.css";
import Discover from "./components/Discover/Discover";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { useSelector } from "react-redux";
function App() {
  const { usersList, ownerUserData, loading } = useSelector(
    (state) => state.users
  );

  const whoToFollow = ownerUserData
    ? usersList?.filter(
        (user) =>
          user.username !== "Katherine" &&
          !ownerUserData.following.some(
            (following) => following.username === user.username
          )
      )
    : [];
  return (
    <>
      <div className="flex mx-auto w-[100%] ">
        <div className="first w-20 md:w-[30%] ">
          <NavBar />
        </div>
        <div className="second md:w-3/4 mt-4 border border-x-gray-600 border-y-black space-y-10">
          <Outlet />
        </div>
        <div className="third md:w-[40%]  hidden md:block">
          <Discover whoToFollow={whoToFollow} />
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
