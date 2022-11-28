import React from "react";
import LeftSideBar from "./LeftSideBar";
import Stories from "./Stories";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import RightSideBar from "./RightSideBar";

export default function Feed() {
  return (
    <div className="flex bg-[#f2f3f7]">
      {/* LeftSidebar */}
      <LeftSideBar />
      {/* Stories */}
      <div className="mx-auto">
        <Stories />
        {/* CreatePost */}
        <CreatePost />
        {/* Posts */}
        <Posts />
      </div>
      {/* RightSidebar */}
      <div>
        <RightSideBar />
      </div>
    </div>
  );
}
