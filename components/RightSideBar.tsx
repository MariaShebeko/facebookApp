import React from "react";

import albert from "../assets/1albert.jpg";
import arnold from "../assets/1arnold.jpg";
import drphil from "../assets/1drphil.webp";
import elon from "../assets/1elon.webp";
import kobe from "../assets/1kobe.webp";
import miketyson from "../assets/1miketyson.jpg";
import mrbeast from "../assets/1mrbeast.jpg";
import rihana from "../assets/1rihana.jpg";
import therock from "../assets/1rock.jpg";

import { BsFillCameraVideoFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import dots from "../assets/dots.png";
import Image from "next/image";

export default function RightSideBar() {
  const profiles = [
    { name: "Albert E.", photo: albert },
    { name: "Arnold S.", photo: arnold },
    { name: "Dr Phill", photo: drphil },
    { name: "Elon Musk", photo: elon },
    { name: "Kobe Briant", photo: kobe },
    { name: "Mike Tyson", photo: miketyson },
    { name: "Mr Beast", photo: mrbeast },
    { name: "Rihana", photo: rihana },
    { name: "The Rock", photo: therock },
  ];
  return (
    <div>
      <div className="hidden lg:block pt-4 sm:pt-8 pr-7">
        <div className="flex items-center  ">
          <p className="pr-4 font-bold">Contscts</p>
          <div className="flex items-center space-x-2">
            <BsFillCameraVideoFill />
            <FiSearch />
            <div className="w-7 h-7">
              <Image src={dots} alt="dots" />
            </div>
          </div>
        </div>
        <div className="space-y-4 mt-4">
          {profiles.map((profile) => (
            <div key={profile.name} className="flex items-center">
              <div className="relative w-12 h-12 flex ">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  className="rounded-full object-cover"
                />
                <div className="absolute w-3.5 h-3.5 bg-green-500 rounded-full bottom-0 right-0.5 border-2 border-white"></div>
              </div>
              <p className="pl-3 font-bold">{profile.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
