import React from "react";
import Post from "./Post";

export default function Posts() {
  return (
    <div className="w-screen sm:w-full">
      <div className="my-6 max-w-[25rem] sm:max-w-[33rem] mx-auto">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}
