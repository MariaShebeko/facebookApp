import React, { useRef, useState } from "react";
import Image from "next/image";
import nouser from "../assets/nouser.png";
import camera from "../assets/camera.png";
import photos from "../assets/photos.png";
import smile from "../assets/smile.png";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, uploadString, ref } from "firebase/storage";

export default function CreatePost() {
  const { data: session } = useSession();
  const captionRef = useRef(null);
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  // Create data post and add it to the firebase
  const uploadPost = async () => {
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      profileImg: session?.user?.image,
      username: session?.user?.name,
      caption: captionRef.current.value,
      timestamp: serverTimestamp(),
    });
    // Path for the image
    const imagePath = ref(storage, `posts/${docRef.id}/image`);

    // Upload image to address
    // Then with the snapshot declare download URL to the firevase
    await uploadString(imagePath, image, "data_url").then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(imagePath);
      await updateDoc(doc(db, "posts", docRef.id), { image: downloadUrl });
    });

    setImage(null);

    setLoading(false);

    captionRef.current.value = null;
  };

  // Add image to state
  const addImageToState = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => setImage(readerEvent.target?.result);
  };

  return (
    <div className="w-screen sm:w-full">
      <div className="max-w-[25rem] sm:max-w-[33rem] mx-auto  sm:px-2 bg-white rounded-[1rem]">
        <div className="mt-8 flex items-center w-full p-3 pt-4">
          <div className="w-12 h-12 shrink-0">
            <img
              src={session ? session?.user?.image : nouser.src}
              alt={session?.user?.email}
              className="rounded-full"
            />
          </div>
          <div className="flex items-center ml-5 w-full">
            <input
              type="text"
              placeholder="What's up"
              className=" bg-[#f2f3f7] outline-0 rounded-full p-1 pl-3 w-full h-12 truncate"
              ref={captionRef}
            />
          </div>

          <div
            className="flex items-center bg-blue-500 px-3 rounded-full h-10 items-center ml-4"
            onClick={uploadPost}
          >
            <button className="font-bold text-white">
              {loading ? "Loading..." : "Post"}
            </button>
          </div>
        </div>

        <div>
          {image ? (
            <div onClick={() => setImage("")}>
              <img src={image} alt="preview image" className="p-4" />
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="border-b mb-4 mt-2"></div>
        <div className="flex justify-between px-3 sm:mx-9 pb-3">
          <div className="flex items-center">
            <div className="w-7 h-7">
              <Image src={camera} alt="camera" />
            </div>
            <p className="pl-2 whitespace-nowrap text-[14px]">Live video</p>
          </div>
          <div
            className="flex  items-center cursor-pointer"
            onClick={() => imageRef.current.click()}
          >
            <div className="w-7 h-7">
              <Image src={photos} alt="photos" />
              <input
                type="file"
                className="hidden"
                ref={imageRef}
                onChange={addImageToState}
              />
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
