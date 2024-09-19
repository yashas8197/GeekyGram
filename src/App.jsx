import "bootstrap-icons/font/bootstrap-icons.css";
import Discover from "./components/Discover/Discover";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className="flex mx-auto w-[100%] ">
      <div className="first w-20 md:w-[30%] ">
        <NavBar />
      </div>
      <div className="second md:w-3/4 mt-4 border border-x-gray-600 border-y-black space-y-10">
        <Outlet />
      </div>
      <div className="third md:w-[40%]  hidden md:block">
        <Discover />
      </div>
    </div>
  );
}

export default App;
