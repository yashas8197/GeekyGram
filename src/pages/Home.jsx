const Home = () => {
  return (
    <div className="second md:[60%] mt-4 border border-x-gray-600 border-y-black space-y-10">
      <div className="whatishapp flex gap-4">
        <div className="img m-2 w-16">
          <img
            className="mr-3 w-12 h-12 rounded-full object-cover"
            src="https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg"
          />
        </div>
        <div className="w-full">
          <input
            className="w-full h-7 my-5 text-xl bg-black outline-none text-white "
            placeholder="what is happening?!"
          />
          <div>
            <div className="flex justify-between items-center">
              <i className="bi bi-card-image text-blue-500 cursor-pointer"></i>
              <button className="bg-[#39A7F2] px-4 font-bold mx-5 text-sm rounded-full py-2  text-white">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="posts">
        <div className="post border-[1px] border-y-gray-600 border-x-0">
          <div className="flex">
            <div className="image my-4 ml-2 w-16 min-w-[4rem]">
              <img
                className="w-12 h-12 rounded-full object-cover "
                src="https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg"
              />
            </div>

            <div className="content my-3">
              <span className="font-bold hover:underline cursor-pointer text-white">
                non aesthetic things
              </span>
              <span className="text-gray-500 hidden sm:inline">
                {" "}
                @yashas8197 . 6h
              </span>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolores, sequi.
              </div>
              <div className="posting md:w-[50%] m-4 ml-0 ">
                <img
                  className="rounded-2xl"
                  src="https://res.cloudinary.com/dlrlwy7hg/image/upload/v1726733659/renp50qybauf6flkjels.jpg"
                />
              </div>

              <div className="icons flex justify-around md:w-[50%] text-gray-700">
                <div className="icon flex items-center justify-center">
                  <i className="bi bi-chat"></i> 1k
                </div>
                <div className="icon flex items-center justify-center">
                  <i className="bi bi-heart"></i> 1k
                </div>
                <div className="icon flex items-center justify-center">
                  <i className="bi bi-share"></i>
                </div>
                <div className="icon flex items-center justify-center">
                  <i className="bi bi-bookmark"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="post border-[1px] border-y-gray-600 border-x-0">
          <div className="flex">
            <div className="image my-4 ml-2 w-16 min-w-[4rem]">
              <img
                className="w-12 h-12 rounded-full object-cover "
                src="https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg"
              />
            </div>

            <div className="content my-3">
              <span className="font-bold hover:underline cursor-pointer text-white">
                non aesthetic things
              </span>
              <span className="text-gray-500 hidden sm:inline">
                {" "}
                @yashas8197 . 6h
              </span>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolores, sequi.
              </div>
              <div className="posting md:w-[50%] m-4 ml-0 ">
                <img
                  className="rounded-2xl"
                  src="https://res.cloudinary.com/dlrlwy7hg/image/upload/v1726733659/renp50qybauf6flkjels.jpg"
                />
              </div>

              <div className="icons flex justify-around md:w-[50%] text-gray-700">
                <div className="icon flex items-center justify-center">
                  <i className="bi bi-chat"></i> 1k
                </div>
                <div className="icon flex items-center justify-center">
                  <i className="bi bi-heart"></i> 1k
                </div>
                <div className="icon flex items-center justify-center">
                  <i className="bi bi-share"></i>
                </div>
                <div className="icon flex items-center justify-center">
                  <i className="bi bi-bookmark"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
