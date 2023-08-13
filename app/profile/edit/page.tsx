'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import TextareaAutosize from 'react-textarea-autosize';
import { E164Number } from 'libphonenumber-js/core';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdLocationPin } from 'react-icons/md';
import 'react-phone-number-input/style.css';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import Image from 'next/image';
import { z } from 'zod';

import NavBreadcrumbs from '@/app/components/NavBreadcrumbs/NavBreadcrumbs';
import generateGravatarUrl from '@/utils/generateGravatarUrl';
import UserProfileLoading from './loading';
import useUser from '@/hooks/useUser';

const DatePicker = dynamic(() => import('./components/DatePicker/DatePicker'), {
  ssr: false,
});

const SaveModal = dynamic(() => import('./components/SaveModal/SaveModal'), {
  ssr: false,
});

const PhoneInput = dynamic(() => import('react-phone-number-input'), {
  ssr: false,
});

const DeleteAccount = dynamic(
  () => import('./components/DeleteAccount/DeleteAccount'),
  {
    loading: () => (
      <button
        aria-label="Delete Account"
        type="button"
        className="w-1/2 mt-4 dark:text-white border border-gray-400 transition-all focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 hover:dark:bg-gray-50/10 focus:outline-none dark:focus:ring-blue-800"
      >
        Delete Account
      </button>
    ),
  }
);

const UserProfileEditSchema = z.object({
  name: z.string().min(1).max(48),
  email: z.string().email(),
  aboutMe: z.string().max(500),
  birthDate: z.date().nullable(),
  languages: z.string().max(50),
  phone: z.string().max(15),
  location: z.string().max(50),
  displayName: z.string().max(16),
});

const EditProfile = () => {
  const { user, isLoading, isFetching } = useUser();

  const queryClient = useQueryClient();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [languages, setLanguages] = useState('');
  const [phone, setPhone] = useState<E164Number | undefined>();
  const [location, setLocation] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [open, setOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = 'Are you sure you want to leave this page?';
    };

    // Add the listener when the component mounts or updates
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup by removing the listener when the component unmounts or updates
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });

  useEffect(() => {
    if (!user) return;
    setName(user?.name || '');
    setEmail(user?.email || '');
    setAboutMe(user?.aboutMe || '');
    setLanguages(user?.languages || '');
    setPhone(user?.phone || '');
    setLocation(user?.location || '');

    if (user?.birthDate) {
      import('date-fns')
        .then(({ parseISO }) => {
          setBirthDate(
            user?.birthDate
              ? parseISO(user.birthDate as unknown as string)
              : undefined
          );
        })
        .catch((err) => {
          console.error('Failed to load module: ', err);
        });
    } else {
      setBirthDate(undefined);
    }

    if (!user?.displayName) {
      import('unique-username-generator')
        .then((module) => {
          setDisplayName(module.generateUsername());
        })
        .catch((err) => {
          console.error('Failed to load module: ', err);
        });
    } else {
      setDisplayName(user?.displayName);
    }
  }, [
    user?.name,
    user?.email,
    user?.aboutMe,
    user?.birthDate,
    user?.languages,
    user?.phone,
    user?.location,
    user?.displayName,
    user,
  ]);

  const hasChanges = () => {
    return (
      name !== user?.name ||
      email !== user?.email ||
      aboutMe !== user?.aboutMe ||
      languages !== user?.languages ||
      phone !== user?.phone ||
      location !== user?.location ||
      displayName !== user?.displayName ||
      birthDate !== user?.birthDate
    );
  };

  const handleSubmit = async () => {
    if (!hasChanges()) throw new Error('No changes were made.');

    UserProfileEditSchema.parse({
      name: name,
      email: email,
      aboutMe: aboutMe,
      birthDate: birthDate,
      languages: languages,
      phone: phone,
      location: location,
      displayName: displayName,
    });

    const res = await fetch('/api/user/edit', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
        aboutMe: aboutMe,
        birthDate: birthDate,
        languages: languages,
        phone: phone,
        location: location,
        displayName: displayName,
      }),
    });
    if (!res.ok) throw new Error(await res.text());
  };

  const { mutate: editProfile } = useMutation(handleSubmit, {
    onSuccess: () => {
      router.push('/profile?revalidate=true');
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      import('react-toastify').then(({ toast }) => {
        toast.success('Profile updated successfully.');
      });
    },
    onError: () => {
      import('react-toastify').then(({ toast }) => {
        toast.error(
          'Error! Please ensure all the fields are filled out correctly and try again.'
        );
      });
    },
  });

  const getLocation = async () => {
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = (await res.json()) as { city: string; country_name: string };
      setLocation(data.city + ', ' + data.country_name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    if (hasChanges()) {
      setOpen(true);
    } else router.push('/profile');
  };

  if (!user || isLoading || isFetching) {
    return <UserProfileLoading />;
  }

  return (
    <>
      <style>
        {`.PhoneInputInput {
          background-color: transparent;
        }`}
      </style>
      <div className="flex flex-col px-6 md:px-16">
        <NavBreadcrumbs
          urls={[
            { name: 'Profile', url: '/profile' },
            { name: 'Edit', url: '/profile/edit' },
          ]}
        />
        <div className="flex flex-col gap-6 mt-3 lg:flex-row">
          <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
            <div className="relative z-0 flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
              <button aria-label="Stop editing" onClick={() => handleOpen()}>
                <AiOutlineClose size={20} className="absolute top-6 right-6" />
              </button>
              <Image
                src={generateGravatarUrl(user)}
                alt="profile"
                className="rounded-md"
                width={80}
                height={80}
              />
              <div className="mt-2 text-lg font-bold ">
                <input
                  className="bg-transparent border rounded border-zinc-500 px-0.5"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>

              <div className="flex flex-row items-center gap-1 text-sm text-zinc-300">
                <input
                  className="bg-transparent border rounded border-zinc-500 px-0.5 mt-1"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                ></input>
              </div>
              <span className="mt-3 text-sm dark:text-white">
                Location:
                <span
                  className="flex flex-row items-center gap-1 mt-1 text-sm cursor-pointer text-zinc-300"
                  onClick={() => getLocation()}
                >
                  <MdLocationPin />
                  <span className="text-zinc-400">{user?.location}</span>
                </span>
              </span>

              <span className="mt-4 text-sm dark:text-white">
                Email Address:
                <div className="text-gray-400">
                  <input
                    className="bg-transparent border rounded border-zinc-500 px-0.5 w-60"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
              </span>
              <span className="mt-3 text-sm dark:text-white">
                Phone number:
                <div className="text-gray-400">
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone}
                    className="bg-transparent border rounded border-zinc-500 px-0.5 w-60"
                  />
                </div>
              </span>
              <div className="flex h-fit">
                <button
                  aria-label="Save"
                  type="button"
                  className="w-1/2 mt-4 text-white bg-green-700 hover:bg-green-800 transition-all focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 dark:bg-green-700 dark:hover:bg-green-800 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => editProfile()}
                >
                  Save
                </button>
                <DeleteAccount />
              </div>
            </div>
          </div>
          <div id="vertical 2" className="flex flex-col gap-4 lg:w-2/3">
            <div className="flex flex-col w-full shadow-md p-7 rounded-xl dark:bg-zinc-900">
              <h1 className="text-xl font-bold">General information</h1>
              <span className="mt-3 text-sm dark:text-white">About me</span>
              <div className="mt-1 text-sm text-zinc-400 lg:w-4/5">
                <TextareaAutosize
                  className="w-full p-1 bg-transparent border rounded border-zinc-500"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                ></TextareaAutosize>
              </div>

              <div className="flex flex-col justify-between gap-5 mt-6 sm:flex-row md:w-4/5">
                <span className="mt-3 text-sm dark:text-white">
                  Birthday:
                  <div className="absolute text-gray-400">
                    <input
                      className="bg-transparent w-60"
                      value={birthDate ? format(birthDate, 'PP') : ''}
                      onClick={() => setDatePickerOpen(!datePickerOpen)}
                      readOnly
                    ></input>
                    {datePickerOpen && (
                      <DatePicker
                        onDateSelect={(date) => {
                          setBirthDate(date);
                        }}
                        closeCallback={() => setDatePickerOpen(!datePickerOpen)}
                      />
                    )}
                  </div>
                </span>
                <span className="mt-3 text-sm dark:text-white">
                  Preferred Language:
                  <div className="text-gray-400">
                    <input
                      className="bg-transparent w-60"
                      value={languages}
                      onChange={(e) => setLanguages(e.target.value)}
                    ></input>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        <SaveModal
          open={open}
          title={'Are you sure you want to leave?'}
          closeCallback={() => setOpen(!open)}
          yesCallback={() => router.push('/profile')}
        />
      </div>
    </>
  );
};

export default EditProfile;
