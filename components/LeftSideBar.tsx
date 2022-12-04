import React from "react";
import { MdHome, MdGroups } from "react-icons/md";
import { BsCart3, BsPeopleFill, BsCalendar2Fill } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineDesktop, AiFillClockCircle } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react";
import nouser from "../assets/nouser.png";

export default function LeftSideBar() {
  const { data: session } = useSession();
  return (
    <div className="w-[10rem] hidden sm:block">
      <div className="flex flex-col pt-4 sm:pt-12 pl-7 ">
        <div className="flex items-center font-bold">
          <MdHome className="w-9 h-9" />
          <p className="ml-2">Home</p>
        </div>

        <div className="flex items-center mt-4">
          <div className="w-9 h-9 shrink-0">
            <img
              src={session ? session?.user?.image : nouser.src}
              alt={session?.user?.email}
              className="rounded-full"
            />
          </div>
          <p className="ml-2 font-bold whitespace-nowrap">
            {session ? session?.user?.name : "Log In"}
          </p>
        </div>

        <div className="border-b my-4"></div>
        <div className="space-y-6">
          <div className="flex items-center font-bold">
            <AiOutlineDesktop className="w-8 h-8" />
            <p className="ml-2">Watch</p>
          </div>

          <div className="flex items-center font-bold">
            <BsPeopleFill className="w-8 h-8" />
            <p className="ml-2">Friends</p>
          </div>

          <div className="flex items-center font-bold">
            <MdGroups className="w-8 h-8" />
            <p className="ml-2">Group</p>
          </div>

          <div className="flex items-center font-bold">
            <BsCart3 className="w-8 h-8" />
            <p className="ml-2">Marketplace</p>
          </div>

          <div className="flex items-center font-bold">
            <BsCalendar2Fill className="w-7 h-7" />
            <p className="ml-2">Events</p>
          </div>

          <div className="flex items-center font-bold">
            <AiFillClockCircle className="w-8 h-8" />
            <p className="ml-2">Memories</p>
          </div>

          <div className="flex items-center">
            <RiArrowDownSLine className="w-8 h-8" />
            <p className="ml-2">See More</p>
          </div>
        </div>
      </div>
    </div>
  );
}
