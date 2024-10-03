/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { useCreatePostMutation } from "@/redux/features/posts/postApi";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Checkbox } from "@nextui-org/checkbox";
import { Input, Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { SerializedError } from "@reduxjs/toolkit";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { LuImage, LuPen, LuSmile, LuVideo, LuX } from "react-icons/lu";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

import { ErrorResponse } from "@/types";

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [title, setTitle] = useState<string>("");
  const [isPremium, setIsPremium] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createPost, { isSuccess, isError, error }] = useCreatePostMutation();

  useEffect(() => {
    if (isError) {
      const errorResponse = error as ErrorResponse | SerializedError;
      const errorMessage =
        (errorResponse as ErrorResponse)?.data?.message ||
        "Something Went Wrong";

      toast.error(errorMessage);
    } else if (isSuccess) {
      toast.success("Successfully Created");
    }
  }, [isError, isSuccess, error]);

  const fileRef = useRef<HTMLInputElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (files.length > 0) {
      setImages((prev) => [...prev, ...files]);

      const newPreviews = files.map((file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        return new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
        });
      });

      Promise.all(newPreviews).then((previews) => {
        setImagePreviews((prev) => [...prev, ...previews]);
      });
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };

  const handlePostSubmit = async () => {
    const formData = new FormData();
    const data = {
      title: title,
      content: postContent,
      category: selectedCategory,
      isPremium: isPremium,
    };

    formData.append("data", JSON.stringify(data));
    images.forEach((image) => {
      formData.append(`images`, image);
    });
    await createPost(formData);
    closeModal();
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="flex items-center p-4">
          <LuPen className="text-blue-500 mr-3" />
          <h2 className="text-lg font-semibold">Create Post</h2>
        </CardHeader>
        <CardBody className="p-4">
          <Textarea
            readOnly
            color="primary"
            placeholder="What's on your mind?"
            onClick={openModal} // Open modal when clicking the textarea
          />
          <div className="flex justify-between mt-4">
            <Button
              startContent={<LuVideo className="mr-2 text-red-500" />}
              variant="light"
            >
              Live Video
            </Button>
            <Button
              startContent={<LuImage className="mr-2 text-green-500" />}
              variant="light"
              onClick={openModal} // Trigger modal for image upload as well
            >
              Photo/Video
            </Button>
            <Button
              startContent={<LuSmile className="mr-2 text-orange-500" />}
              variant="light"
            >
              Feeling/Activity
            </Button>
            <Button color="primary" onClick={openModal}>
              Post
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Modal for Rich Text Editor, Image Upload & Category Selection */}
      <Modal
        isOpen={isModalOpen}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        size="xl"
        onClose={closeModal}
        onOpenChange={closeModal}
      >
        <ModalContent>
          <ModalHeader>
            <h3>Create Post</h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              {/* Rich Text Editor */}
              <Input
                isClearable
                color="primary"
                name="title"
                placeholder="Enter Post Title"
                radius="none"
                variant="underlined"
                onValueChange={setTitle}
              />
              <ReactQuill
                placeholder="Write your story or tip here..."
                theme="snow"
                value={postContent}
                onChange={setPostContent}
              />
              {/* Category Selection */}
              <div className="flex justify-between">
                <RadioGroup
                  color="primary"
                  orientation="horizontal"
                  size="sm"
                  onValueChange={setSelectedCategory}
                >
                  <Radio value="Tip">Tip</Radio>
                  <Radio value="Story">Story</Radio>
                </RadioGroup>
                <Checkbox
                  isSelected={isPremium}
                  radius="full"
                  size="sm"
                  onValueChange={setIsPremium}
                >
                  Premium
                </Checkbox>
              </div>

              {/* Image Upload */}
              <div>
                <input
                  ref={fileRef}
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <div className="flex flex-wrap items-center gap-3">
                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <Image
                            alt={`Selected ${index}`}
                            className="size-20 object-cover rounded-lg shadow-md"
                            height={80}
                            src={preview}
                            width={80}
                          />
                          <button
                            className="absolute top-0.5 right-0.5 bg-white p-0.5 rounded-full shadow-sm"
                            onClick={() => removeImage(index)}
                          >
                            <LuX className="text-default-900" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div
                    className={`${
                      imagePreviews.length > 0 ? "size-20 mt-4" : "py-6 w-full"
                    } flex items-center justify-center flex-col border-[#e5eaf2] border rounded-md cursor-pointer`}
                    onClick={() => fileRef.current && fileRef.current.click()}
                  >
                    <FiUpload
                      className="text-[#777777]"
                      size={imagePreviews.length > 0 ? 15 : 25}
                    />
                    <p
                      className={`text-[#777777] ${
                        imagePreviews.length > 0
                          ? "text-sm text-center"
                          : "text-lg"
                      }`}
                    >
                      {imagePreviews.length > 0
                        ? "Add more files"
                        : "Browse to upload your file"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="shadow" onClick={closeModal}>
              Cancel
            </Button>
            <Button color="primary" variant="shadow" onClick={handlePostSubmit}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
