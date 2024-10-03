import { LuBird } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import { AttentionSeeker } from "react-awesome-reveal";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [swing, setSwing] = useState(false);

  useEffect(() => {
    setSwing(true);

    const timer = setTimeout(() => setSwing(false), 1000); // Adjust to match the effect duration

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="sticky top-0 z-20 bg-black p-[2rem] pl-[4.2vw] flex items-center  font-semibold h-[10vh]">
      <div className="logo flex text-2xl mx-auto sm:m-0">
        {swing ? (
          <AttentionSeeker effect="swing">
            <LuBird
              onClick={() => navigate("/")}
              className="header-logo"
              size={25}
            />
          </AttentionSeeker>
        ) : (
          <LuBird
            onClick={() => navigate("/")}
            className="header-logo"
            size={25}
          />
        )}
        <p
          onClick={() => navigate("/")}
          className="hidden sm:inline-block ml-3 text-white cursor-pointer"
        >
          Geeky<span className="text-[#39A7F2]">Gram</span>
        </p>
      </div>
    </div>
  );
};

export default Header;
