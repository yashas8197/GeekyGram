import "bootstrap-icons/font/bootstrap-icons.css";
import Discover from "./components/Discover/Discover";
import NavBar from "./components/NavBar/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { useState } from "react";
import AddPostDialog from "./components/AddPostDialog/AddPostDialog";
import Header from "./components/Header/Header";
function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <div className="flex flex-col min-h-screen mx-auto w-full">
          <div className="flex-grow flex">
            <div className="first sm:w-20 xl:w-[30%] md:w-[10%]">
              <div className="sidebar  flex sm:flex-row md:items-end md:flex-col sticky top-24 xl:mr-10 z-10">
                <NavBar />
              </div>
            </div>
            <div className="second lg:w-3/4 border border-x-black border-y-black space-y-10">
              <Outlet />
            </div>
            <div className="third lg:w-1/2 hidden lg:block">
              <Discover />
            </div>
          </div>
          <Toaster />
          <div id="addPost" className={`fixed bottom-20 right-3 z-10`}>
            <button
              onClick={handleOpenDialog}
              className="md:hidden block bg-[#39A7F2] px-4 m-2 text-xl rounded-full py-3 text-white"
            >
              <i className="bi bi-feather"></i>
            </button>
          </div>
        </div>
      </ThemeProvider>
      <AddPostDialog
        setIsDialogOpen={setIsDialogOpen}
        isDialogOpen={isDialogOpen}
      />
    </>
  );
}

export default App;
