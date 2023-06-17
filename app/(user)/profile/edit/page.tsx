"use client";

import React, { useState, useEffect } from "react";
import { MdLocationPin } from "react-icons/md";
import useUser from "@/hooks/useUser";
import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import moment from "moment";
import Modal from "@/components/Modal/Modal";
import UserProfileLoading from "../loading";
import DeleteAccount from "@/components/DeleteAccount/DeleteAccount";

type Props = {};

const EditProfile = (props: Props) => {
  const { user, isLoading, isFetching, error } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [languages, setLanguages] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave this page?";
    };

    // Add the listener when the component mounts or updates
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup by removing the listener when the component unmounts or updates
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  });

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setAboutMe(user?.aboutMe || "");
    setBirthDate(moment(user?.birthDate).format("LL") || "");
    setLanguages(user?.languages || "");
    setPhone(user?.phone || "");
    setLocation(user?.location || "");
  }, [
    user?.name,
    user?.email,
    user?.aboutMe,
    user?.birthDate,
    user?.languages,
    user?.phone,
    user?.location,
  ]);

  const hasChanges = () => {
    return (
      name !== user?.name ||
      email !== user?.email ||
      aboutMe !== user?.aboutMe ||
      birthDate !== moment(user?.birthDate).format("LL") ||
      languages !== user?.languages ||
      phone !== user?.phone ||
      location !== user?.location
    );
  };

  const handleSubmit = async () => {
    try {
      if (!hasChanges()) {
        router.push("/profile");
        return;
      }

      const res = await fetch("/api/user/edit", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          aboutMe: aboutMe,
          birthDate: birthDate,
          languages: languages,
          phone: phone,
          location: location,
        }),
      });
      router.push("/profile?revalidate=true");
    } catch (error) {
      console.log(error);
    } finally {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    }
  };

  const updateLocation = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      setLocation(data.city + ", " + data.country_name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    if (hasChanges()) {
      setOpen(true);
    } else router.push("/profile");
  };

  if (!user || isLoading || isFetching) {
    return <UserProfileLoading />;
  }

  return (
    <div className="flex flex-col px-6 md:px-16">
      <nav className="flex ml-1" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <div className="inline-flex items-center text-lg font-medium text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
              <svg
                aria-hidden="true"
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <button onClick={() => handleOpen()}>
                <div className="ml-1 text-lg font-medium text-gray-700 hover:text-green-600 md:ml-2 dark:text-gray-400 dark:hover:text-green-400">
                  Profile
                </div>
              </button>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div className="ml-1 text-lg font-medium text-gray-700 hover:text-green-600 md:ml-2 dark:text-gray-400 dark:hover:text-green-400">
                Edit
              </div>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6 mt-3">
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <div className="relative z-0 flex flex-col p-7 rounded-xl shadow-md dark:bg-zinc-900 w-full">
            <button onClick={() => handleOpen()}>
              <AiOutlineClose size={20} className="absolute top-6 right-6" />
            </button>
            <Image
              src={
                user?.image ||
                `https://www.gravatar.com/avatar/${user?.email}?d=identicon`
              }
              alt="profile"
              className="rounded-md"
              width={80}
              height={80}
            />
            <p className="text-lg font-bold mt-2 ">
              <input
                className="bg-transparent"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </p>
            <button
              className="text-zinc-300 text-sm flex-row flex items-center justiffy-center gap-1"
              onClick={() => updateLocation()}
            >
              <MdLocationPin />
              <span className="text-zinc-400">
                {location ? location : "Click the pin"}
              </span>
            </button>
            <span className="mt-4 text-sm dark:text-white">
              Email Address:
              <p className="text-gray-400">
                <input
                  className="bg-transparent w-60"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </p>
            </span>
            <span className="mt-3 text-sm dark:text-white">
              Phone number:
              <p className="text-gray-400">
                <input
                  className="bg-transparent w-60"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></input>
              </p>
            </span>
            <div className="h-fit flex">
              <button
                type="button"
                className="w-1/2 mt-4 text-white bg-green-700 hover:bg-green-800 transition-all focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 dark:bg-green-700 dark:hover:bg-green-800 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => handleSubmit()}
              >
                Save
              </button>
              <DeleteAccount />
            </div>
          </div>
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 lg:w-2/3">
          <div className="flex flex-col p-7 rounded-xl shadow-md w-full dark:bg-zinc-900">
            <h1 className="text-xl font-bold">General information</h1>
            <h2 className="text-lg mt-4">About me</h2>
            <p className="text-sm text-zinc-400 lg:w-4/5 mt-1">
              <TextareaAutosize
                className="bg-transparent w-full"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
              ></TextareaAutosize>
            </p>

            <div className="flex flex-row justify-between md:w-4/5 mt-6">
              <span className="mt-3 text-sm dark:text-white">
                Birthday:
                <p className="text-gray-400">
                  <input
                    className="bg-transparent w-60"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  ></input>
                </p>
              </span>
              <span className="mt-3 text-sm dark:text-white">
                Languages:
                <p className="text-gray-400">
                  <input
                    className="bg-transparent w-60"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                  ></input>
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        title={"Are you sure you want to leave?"}
        closeCallback={() => setOpen(!open)}
        yesCallback={() => router.push("/profile")}
      />
    </div>
  );
};

export default EditProfile;