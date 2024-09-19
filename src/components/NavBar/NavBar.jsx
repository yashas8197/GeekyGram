import { NavLink, useLocation } from "react-router-dom";
const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="sidebar flex md:items-end flex-col sticky top-0">
      <div className="logo self-start md:mx-20 text-2xl my-4">
        <p className="hidden md:block">GeekyGram</p>
        <i className="bi bi-twitter-x md:hidden ml-5"></i>
      </div>
      <ul className="flex flex-col text-2xl space-y-3 md:px-11 font-semibold">
        <li>
          <NavLink
            className={`flex md:justify-start items-center gap-3 justify-center  md:w-fit hover:bg-gray-900 hover:cursor-pointer px-5 py-3 hover:rounded-full cursor-pointer ${
              currentPath === "/" ? "text-blue-500" : ""
            }`}
            to="/"
          >
            <i className="bi bi-house-fill"></i>
            <span className="hidden md:block">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`flex md:justify-start items-center gap-3 justify-center  md:w-fit hover:bg-gray-900 hover:cursor-pointer px-5 py-3 hover:rounded-full cursor-pointer ${
              currentPath === "/explore" ? "text-blue-500" : ""
            }`}
            to="/explore"
          >
            <i className="bi bi-search"></i>
            <span className="hidden md:block">Explore</span>
          </NavLink>
        </li>
        <li className="">
          <NavLink
            className={`flex md:justify-start items-center gap-3 justify-center  md:w-fit hover:bg-gray-900 hover:cursor-pointer px-5 py-3 hover:rounded-full cursor-pointer ${
              currentPath === "/bookmark" ? "text-blue-500" : ""
            }`}
            to="/bookmark"
          >
            <i className="bi bi-bookmark-fill"></i>
            <span className="hidden md:block">Bookmark</span>
          </NavLink>
        </li>
        <li className="">
          <NavLink
            className={`flex md:justify-start items-center gap-3 justify-center  md:w-fit hover:bg-gray-900 hover:cursor-pointer px-5 py-3 hover:rounded-full cursor-pointer ${
              currentPath === "/profile/yasha" ? "text-blue-500" : ""
            }`}
            to="/profile/yasha"
          >
            <i className="bi bi-person-circle"></i>
            <span className="hidden md:block">Profile</span>
          </NavLink>
        </li>
        <li>
          <div className="post w-full text-center my-4">
            <button className="hidden md:block bg-[#39A7F2] px-16 text-xl rounded-full py-3 text-white">
              <i className="bi bi-feather mr-2"></i>Post
            </button>
            <button className="md:hidden bg-[#39A7F2] px-4 text-xl rounded-full py-3 text-white">
              <i className="bi bi-feather"></i>
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
