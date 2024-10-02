import { NavLink, useLocation } from "react-router-dom";
import AddPostDialog from "../AddPostDialog/AddPostDialog";
import { useState } from "react";

const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="">
        <ul className="flex md:flex-col sm:justify-start  justify-around  text-2xl space-y-3 font-semibold md:space-y-2 md:static fixed bottom-0 left-0 right-0">
          <li className="">
            <NavLink
              className={`flex  items-center gap-3 hover:bg-gray-900 px-5 pt-2 sm:py-3 hover:rounded-full ${
                currentPath === "/" ? "text-[#39A7F2]" : ""
              }`}
              to="/"
            >
              <i className="bi bi-house-fill"></i>
              <span className="hidden xl:block">Home</span>
            </NavLink>
          </li>
          <li className="">
            <NavLink
              className={`flex  items-center gap-3  hover:bg-gray-900 px-5 pb-2 sm:py-3 hover:rounded-full ${
                currentPath === "/explore" ? "text-[#39A7F2]" : ""
              }`}
              to="/explore"
            >
              <i className="bi bi-search"></i>
              <span className="hidden xl:block">Explore</span>
            </NavLink>
          </li>
          <li className="">
            <NavLink
              className={`flex  items-center gap-3 hover:bg-gray-900 px-5 pb-2 sm:py-3 hover:rounded-full ${
                currentPath === "/bookmark" ? "text-[#39A7F2]" : ""
              }`}
              to="/bookmark"
            >
              <i className="bi bi-bookmark-fill"></i>
              <span className="hidden xl:block">Bookmark</span>
            </NavLink>
          </li>
          <li className="">
            <NavLink
              className={`flex  items-center gap-3 hover:bg-gray-900  px-5 pb-2 sm:py-3 hover:rounded-full ${
                currentPath === "/profile/Katherine" ? "text-[#39A7F2]" : ""
              }`}
              to="/profile/Katherine"
            >
              <i className="bi bi-person-circle"></i>
              <span className="hidden xl:block">Profile</span>
            </NavLink>
          </li>
          <li className="hidden md:block lg:block xl:hidden">
            <button
              onClick={handleOpenDialog}
              className="bg-[#39A7F2] px-4 m-2 text-xl rounded-full py-3 text-white"
            >
              <i className="bi bi-feather"></i>
            </button>
          </li>

          <li className="hidden xl:block">
            <div className="post w-full text-center">
              <button
                onClick={handleOpenDialog}
                className="bg-[#39A7F2] px-16 text-xl rounded-full sm:py-3 text-white"
              >
                <i className="bi bi-feather mr-2"></i>Post
              </button>
            </div>
          </li>
        </ul>
      </div>
      <AddPostDialog
        setIsDialogOpen={setIsDialogOpen}
        isDialogOpen={isDialogOpen}
      />
    </>
  );
};

export default NavBar;
