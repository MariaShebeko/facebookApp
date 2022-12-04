import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Post from "./Post";
import { db } from "../firebase";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => setPosts(snapshot.docs)
    );
    return () => {
      unSubscribe();
    };
  }, [db]);

  return (
    <div className="w-screen sm:w-full">
      <div className="my-6 max-w-[25rem] sm:max-w-[33rem] mx-auto">
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            username={post.data().username}
            userImg={post.data().profileImg}
            caption={post.data().caption}
            timestamp={post.data().timestamp}
            postImg={post.data().image}
          />
        ))}
      </div>
    </div>
  );
}
