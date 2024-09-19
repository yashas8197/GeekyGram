import React from "react";

const Discover = () => {
  return (
    <div className="who sticky top-0 m-3 bg-[#16181c] w-3/4 py-5 rounded-xl space-y-1">
      <h1 className="text-xl font-bold px-3">Who to follow?</h1>
      <div className="item p-1 items-center px-3 flex justify-between">
        <div className="flex gap-3 items-center">
          <div className="p1">
            <img
              src="https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg"
              alt="User Avatar"
              className="p-1 w-16 h-16 object-cover"
            />
          </div>
          <div className="p2">
            <p className="font-semibold">firstname</p>
            <p className="text-gray-500">@username</p>
          </div>
          <div className="p3">
            <button className="px-3 py-2 bg-gray-200 text-black rounded-full font-semibold">
              Follow
            </button>
          </div>
        </div>
      </div>
      <div className="item p-1 items-center px-3 flex justify-between">
        <div className="flex gap-3 items-center">
          <div className="p1">
            <img
              src="https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg"
              alt="User Avatar"
              className="p-1 w-16 h-16 object-cover"
            />
          </div>
          <div className="p2">
            <p className="font-semibold">firstname</p>
            <p className="text-gray-500">@username</p>
          </div>
          <div className="p3">
            <button className=" px-3 py-2 bg-gray-200 text-black rounded-full font-semibold">
              Follow
            </button>
          </div>
        </div>
      </div>
      <div className="item p-1 items-center px-3 flex justify-between">
        <div className="flex gap-3 items-center">
          <div className="p1">
            <img
              src="https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg"
              alt="User Avatar"
              className="p-1 w-16 h-16 object-cover"
            />
          </div>
          <div className="p2">
            <p className="font-semibold">firstname</p>
            <p className="text-gray-500">@username</p>
          </div>
          <div className="p3">
            <button className="px-3 py-2 bg-gray-200 text-black rounded-full font-semibold">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
