import React, { useEffect, useState } from "react";
import Image from "next/image";
import dots from "../assets/dots.png";
import hearth from "../assets/hearth.png";
import like from "../assets/like.png";
import nouser from "../assets/nouser.png";
import { BiLike, BiSmile } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import share from "../assets/share.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineCamera, AiOutlineGif } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import bluelike from "../assets/25like.png";
import blacklike from "../assets/2unlike.png";
import Moment from "react-moment";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  deleteDoc,
  setDoc,
  doc,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

interface IPost {
  id: any;
  username: string | undefined;
  userImg: string | undefined;
  caption: string | undefined;
  timestamp: string | undefined;
  postImg?: string | undefined;
}

export default function Post({
  id,
  username,
  userImg,
  caption,
  timestamp,
  postImg,
}: IPost) {
  const { data: session } = useSession();

  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // When likes update in db the likes in app updates
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, [db, id]);

  // Checking if user liked the post
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  // Add once add like to firebase, double - delete like from db
  const toggleLike = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
        username: session?.user.name,
      });
    }
  };

  // When comments update in the db update them in the app
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);

  // Send the comments to db
  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session?.user?.name,
      image: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white rounded-[1rem] px-4 py-4 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12">
            <img src={userImg} alt={username} className="rounded-full" />
          </div>
          <div className="ml-3">
            <p className="font-bold ">{username}</p>

            <div className="flex">
              <p className="text-xs">
                <Moment fromNow>{timestamp?.toDate()}</Moment> &#8226;
              </p>
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
        <p>{caption}</p>
      </div>
      {/* Image */}
      <div className="-mx-4">
        <img src={postImg} alt="postImage" />
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
              {`John Doe and another ${likes.length}`}
            </p>
          </div>
          <p className="whitespace-nowrap  text-[15px] sm:text-[16px]">
            {`${comments.length} Comments`}
          </p>
        </div>

        <div className="border-b my-2"></div>
        <div className="flex justify-between mx-6">
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleLike}
          >
            <img
              src={hasLiked ? bluelike.src : blacklike.src}
              className="w-6 h-6"
            />
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
          <p>{`See ${comments.length} previous comments`}</p>
          <div className="flex items-center">
            <p>Most Relevant</p>
            <RiArrowDownSLine />
          </div>
        </div>
        {/* Comments start */}
        {comments.map((comment) => (
          <div className="">
            <div className="flex items-center mt-3">
              <div className="w-10 h-10">
                <img
                  src={comment.data().image}
                  alt="user"
                  className="rounded-full"
                />
              </div>
              <p className="ml-2 font-bold">{comment.data().username}</p>
              <p className="ml-2">{comment.data().comment}</p>
            </div>
            <div className="ml-[3rem] flex -mt-1.5">
              <p className="mr-2">Like</p>
              <p>Reply</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center mt-4">
        <div className=" w-10 h-10 shrink-0">
          <img
            src={session ? session.user?.image : nouser.src}
            alt="user"
            className="rounded-full"
          />
        </div>
        <div className="ml-2 w-full rounded-full bg-[#f2f3f7] flex items-center relative">
          <input
            type="text"
            placeholder="Write a comment"
            className="outline-0 bg-[#f2f3f7] p-1 rounded-full w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex absolute right-[4.5rem] space-x-2 text-[#8e8d8d]">
            <BiSmile />
            <AiOutlineCamera />
            <AiOutlineGif />
          </div>
          <div className="mr-4 bg-blue-400 text-white rounded-full">
            <button className="font-bold px-2" onClick={sendComment}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
