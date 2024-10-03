"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Skeleton } from "@nextui-org/skeleton";
import { SerializedError } from "@reduxjs/toolkit";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { toast } from "sonner";

import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/user/userApi";
import { ErrorResponse } from "@/types";

export default function MyProfileHeader() {
  const { data: user, isLoading } = useGetMeQuery(undefined);
  const [updateProfile, { isSuccess, isError, error }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (isError) {
      const errorResponse = error as ErrorResponse | SerializedError;
      const errorMessage =
        (errorResponse as ErrorResponse)?.data?.message ||
        "Something Went Wrong";

      toast.error(errorMessage);
    } else if (isSuccess) {
      toast.success("Successfully Updated");
    }
  }, [isError, isSuccess, error]);

  const [coverPhoto, setCoverPhoto] = useState(user?.cover);
  const [newCoverPhoto, setNewCoverPhoto] = useState("");
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
  const [isCoverPhotoEditing, setIsCoverPhotoEditing] = useState(false);

  const [profilePic, setProfilePic] = useState(user?.avatar);
  const [newProfilePic, setNewProfilePic] = useState("");
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const coverPhotoInputRef = useRef<HTMLInputElement | null>(null);
  const profilePicInputRef = useRef<HTMLInputElement | null>(null);

  const handleCoverPhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    setCoverPhotoFile(file || null);
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      setNewCoverPhoto(fileUrl);
      setIsCoverPhotoEditing(true);
    }
  };

  const handleProfilePicChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    setProfilePicFile(file || null);
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      setNewProfilePic(fileUrl);
      setIsModalOpen(true);
    }
  };

  const confirmProfilePic = () => {
    setProfilePic(newProfilePic);
    setIsModalOpen(false);
    saveProfilePicture();
  };

  const cancelProfilePic = () => {
    setNewProfilePic("");
    setProfilePicFile(null);
    setIsModalOpen(false);
  };

  const saveProfilePicture = async () => {
    if (profilePicFile) {
      const formData = new FormData();
      const toastId = toast.loading("Profile Picture is Updating..");

      formData.append("avatar", profilePicFile);
      await updateProfile(formData);
      toast.dismiss(toastId);
    }
  };

  const saveCoverPhoto = async () => {
    if (coverPhotoFile) {
      const formData = new FormData();
      const toastId = toast.loading("Cover Photo is Updating..");

      formData.append("cover", coverPhotoFile);
      await updateProfile(formData);
      setCoverPhoto(newCoverPhoto);
      setIsCoverPhotoEditing(false);
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    setProfilePic(user?.avatar);
    setCoverPhoto(user?.cover);
  }, [isLoading]);

  if (isLoading) {
    return (
      <section className="relative pt-48 sm:pt-56 pb-5">
        <Skeleton className="absolute top-0 left-0 w-full h-60 sm:h-72 rounded-xl">
          <div className="h-60 sm:h-72 bg-default-300 rounded-xl" />
        </Skeleton>

        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
            <Skeleton className="rounded-full border-4 border-white">
              <div className="w-24 sm:w-32 h-24 sm:h-32 bg-default-300 rounded-full" />
            </Skeleton>
          </div>
          <div className="space-y-3 text-center sm:text-left">
            <Skeleton>
              <div className="w-3/5 h-6 bg-default-300 rounded-lg mx-auto sm:mx-0" />
            </Skeleton>
            <Skeleton>
              <div className="w-4/5 h-5 bg-default-300 rounded-lg mx-auto sm:mx-0" />
            </Skeleton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Profile Header */}
      <div className="relative rounded-2xl overflow-hidden w-full h-80 bg-gradient-to-r from-blue-500 to-indigo-600">
        {/* Cover Photo */}
        <Image
          alt="Cover Photo"
          className="absolute top-0 left-0 w-full h-full object-cover"
          height={315}
          src={newCoverPhoto || coverPhoto || "/default-cover.jpg"}
          width={850}
        />
        <div className="absolute top-4 md:top-64 right-4">
          {/* Cover Photo Edit Button */}
          <Button
            className="relative overflow-visible rounded-full hover:-translate-y-1 md:px-8 shadow-xl after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-primary-500/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
            color="primary"
            onClick={() => coverPhotoInputRef.current?.click()}
          >
            <CiEdit className="md:hidden" />
            <span className="hidden md:block">Edit Cover Photo</span>
          </Button>
          <input
            ref={coverPhotoInputRef}
            accept="image/*"
            style={{ display: "none" }}
            type="file"
            onChange={handleCoverPhotoChange}
          />
        </div>
        {/* Show Save Button if cover photo is being edited */}
        {isCoverPhotoEditing && (
          <div className="absolute bottom-4 md:bottom-64 right-4 space-x-3">
            <Button
              className="relative text-white overflow-visible rounded-full hover:-translate-y-1 px-8 shadow-xl after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-danger-500/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
              color="danger"
              onClick={() => {
                setNewCoverPhoto("");
                setIsCoverPhotoEditing(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="relative text-white overflow-visible rounded-full hover:-translate-y-1 px-8 shadow-xl after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-success-500/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
              color="success"
              onClick={saveCoverPhoto}
            >
              Save
            </Button>
          </div>
        )}
        <div className="absolute bottom-0 left-4 flex items-center p-4 space-x-5">
          <div className="relative">
            <Image
              alt="Profile Picture"
              className="rounded-full size-24 object-cover object-top"
              height={96}
              src={newProfilePic || profilePic || "/default-avatar.jpg"}
              width={96}
            />
            <button
              className="bg-primary-500 text-white rounded-full p-1.5 absolute bottom-0 right-0"
              onClick={() => profilePicInputRef.current?.click()}
            >
              <CiEdit />
            </button>
            <input
              ref={profilePicInputRef}
              accept="image/*"
              style={{ display: "none" }}
              type="file"
              onChange={handleProfilePicChange}
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h1 className="text-default-900 text-2xl font-semibold">
          {user?.name}
        </h1>
        <div className="flex items-center justify-center md:justify-start text-gray-600">
          <span className="ml-2">{user?.followers?.length} Followers</span>
          <span className="mx-2">•</span>
          <span>{user?.following?.length} Following</span>
        </div>
      </div>

      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Confirm Profile Picture
          </ModalHeader>
          <ModalBody className="flex justify-center">
            <Image
              alt="New Profile Picture"
              className="rounded-full size-24"
              height={96}
              src={newProfilePic}
              width={96}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={confirmProfilePic}>
              Confirm
            </Button>
            <Button color="danger" onClick={cancelProfilePic}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
