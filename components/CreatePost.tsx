import React from "react";
import Image from "next/image";
import maria from "../assets/maria.jpg";
import camera from "../assets/camera.png";
import photos from "../assets/photos.png";
import smile from "../assets/smile.png";

export default function CreatePost() {
  return (
    <div className="w-screen sm:w-full">
      <div className="max-w-[25rem] sm:max-w-[33rem] mx-auto  sm:px-2 bg-white rounded-[1rem]">
        <div className="mt-8 flex items-center w-full p-3 pt-4">
          <div className="w-14 h-14 shrink-0">
            <Image src={maria} alt="maria" className="rounded-full" />
          </div>
          <div className="flex items-center ml-5 w-full">
            <input
              type="text"
              placeholder="What's up"
              className=" bg-[#f2f3f7] outline-0 rounded-full p-1 pl-3 w-full h-12 truncate"
            />
          </div>

          <div className="flex items-center bg-blue-500 px-3 rounded-full h-10 items-center ml-4">
            <button className="font-bold text-white">Post</button>
          </div>
        </div>
        <div className="border-b mb-4 mt-2"></div>
        <div className="flex justify-between px-3 sm:mx-9 pb-3">
          <div className="flex items-center">
            <div className="w-7 h-7">
              <Image src={camera} alt="camera" />
            </div>
            <p className="pl-2 whitespace-nowrap text-[14px]">Live video</p>
          </div>
          <div className="flex  items-center">
            <div className="w-7 h-7">
              <Image src={photos} alt="photos" />
            </div>
            <p className="pl-2 text-[14px]">Photo/Video</p>
          </div>
          <div className="flex  items-center">
            <div className="w-7 h-7">
              <Image src={smile} alt="smile" />
            </div>
            <p className="pl-2 text-[14px]">Feeling/Activity</p>
          </div>
        </div>
      </div>
    </div>
  );
}
