import React from "react";
import Image from "next/image";
import maria from "../assets/maria.jpg";
import dots from "../assets/dots.png";
import car from "../assets/c-class.jpg";
import hearth from "../assets/hearth.png";
import like from "../assets/like.png";
import { BiLike, BiSmile } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import share from "../assets/share.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineCamera, AiOutlineGif } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";

export default function Post() {
  return (
    <div className="bg-white rounded-[1rem] px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12">
            <Image src={maria} alt="user" className="rounded-full" />
          </div>
          <div className="ml-3">
            <p className="font-bold ">Maria</p>

            <div className="flex">
              <p className="text-xs">3 hours ago &#8226;</p>
              <BiWorld className="ml-1 shrink-0" />
            </div>
          </div>
        </div>
        <div className="w-10 h-10">
          <Image src={dots} alt="dots" />
        </div>
      </div>

      {/* Input */}
      <div className="my-3 ">
        <p>My brand new car</p>
      </div>
      {/* Image */}
      <div className="-mx-4">
        <Image src={car} alt="car" />
      </div>

      {/* Number of likes + Buttons */}
      <div>
        <div className="flex justify-between text-[#8e8d8d] mt-1">
          <div className="flex items-center ">
            <div className="w-[1.1rem] h-[1.1rem]">
              <Image src={like} alt="like" />
            </div>
            <div className="ml-[2px] w-5 h-5">
              <Image src={hearth} alt="hearth" />
            </div>
            <p className="pl-2 whitespace-nowrap text-[15px] sm:text-[16px]">
              John Doe and another 21,372
            </p>
          </div>
          <p className="whitespace-nowrap  text-[15px] sm:text-[16px]">
            372 Comments
          </p>
        </div>

        <div className="border-b my-2"></div>
        <div className="flex justify-between mx-6">
          <div className="flex items-center">
            <BiLike className="w-6 h-6" />
            <p className="pl-2 text-[18px]">Like</p>
          </div>
          <div className="flex items-center">
            <FaRegCommentAlt className="w-6 h-6" />
            <p className="pl-2 text-[18px]">Comment</p>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5">
              <Image src={share} alt="share" />
            </div>
            <p className="pl-2 text-[18px]">Share</p>
          </div>
        </div>
        <div className="border-b  my-2"></div>
      </div>

      {/* Comments */}
      <div className="max-h-40 overflow-y-auto">
        <div className="flex justify-between text-[#8e8d8d]">
          <p>See 371 previous comments</p>
          <div className="flex items-center">
            <p>Most Relevant</p>
            <RiArrowDownSLine />
          </div>
        </div>
        {/* First Comment */}
        <div className="">
          <div className="flex items-center mt-3">
            <div className="w-10 h-10">
              <Image src={maria} alt="user" className="rounded-full" />
            </div>
            <p className="ml-2 font-bold">Maria</p>
            <p className="ml-2">I love the color</p>
          </div>
          <div className="ml-[3rem] flex -mt-1.5">
            <p className="mr-2">Like</p>
            <p>Reply</p>
          </div>
        </div>
        {/* Second Comment */}
        <div className="">
          <div className="flex items-center mt-3">
            <div className="w-10 h-10">
              <Image src={maria} alt="user" className="rounded-full" />
            </div>
            <p className="ml-2 font-bold">Maria</p>
            <p className="ml-2">Second comment</p>
          </div>
          <div className="ml-[3rem] flex -mt-1.5">
            <p className="mr-2">Like</p>
            <p>Reply</p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center mt-4">
        <div className=" w-10 h-10 shrink-0">
          <Image src={maria} alt="user" className="rounded-full" />
        </div>
        <div className="ml-2 w-full rounded-full bg-[#f2f3f7] flex items-center relative">
          <input
            type="text"
            placeholder="Write a comment"
            className="outline-0 bg-[#f2f3f7] p-1 rounded-full w-full"
          />
          <div className="flex absolute right-[4.5rem] space-x-2 text-[#8e8d8d]">
            <BiSmile />
            <AiOutlineCamera />
            <AiOutlineGif />
          </div>
          <div className="mr-4 bg-blue-400 text-white rounded-full">
            <button className="font-bold px-2">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}
