import { useUpdatePostMutation } from "@/redux/features/posts/postApi";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { LuX } from "react-icons/lu";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

// Import your list of categories here
import { Radio, RadioGroup } from "@nextui-org/radio";

import { ErrorResponse, TPost } from "@/types";

export default function EditPostModal({
  post,
  closeModal,
  isModalOpen,
}: {
  post: TPost;
  closeModal: () => void;
  isModalOpen: boolean;
}) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );
  const [postContent, setPostContent] = useState(post?.content || "");
  const [title, setTitle] = useState<string>(post?.title || "");
  const [category, setCategory] = useState<string>(post?.category || "");
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    post?.imageUrls || [],
  );

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [updatePost, { isSuccess, isError, error }] = useUpdatePostMutation();

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isError) {
      const errorResponse = error as ErrorResponse;
      const errorMessage =
        errorResponse?.data?.message || "Something Went Wrong";

      toast.error(errorMessage);
    } else if (isSuccess) {
      toast.success("Post Updated Successfully");
    }
  }, [isError, isSuccess, error, closeModal]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setImages((prev) => [...prev, ...Array.from(files)]);
      setImagePreviews((prev) => [
        ...prev,
        ...Array.from(files).map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  // Function to remove existing image
  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };
  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Function to handle updating post
  const handleUpdatePost = async () => {
    const formData = new FormData();

    const data = {
      title: title,
      content: postContent,
      category: category,
      imageUrls: existingImages,
    };

    formData.append("data", JSON.stringify(data));
    images.forEach((image) => {
      formData.append(`images`, image);
    });

    await updatePost({ id: post?._id, formData });
    closeModal();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      scrollBehavior={"inside"}
      size="xl"
      onClose={closeModal}
    >
      <ModalContent>
        <ModalHeader className="flex justify-between">
          <h2>Edit Post</h2>
        </ModalHeader>
        <ModalBody>
          {/* Title Input */}
          <Input
            required
            label="Post Title"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Content Editor */}
          <div className="my-4">
            <ReactQuill value={postContent} onChange={setPostContent} />
          </div>

          {/* Category Selection */}
          <div className="flex justify-between">
            <RadioGroup
              color="primary"
              defaultValue={category}
              orientation="horizontal"
              size="sm"
              onValueChange={setCategory}
            >
              <Radio value="Tip">Tip</Radio>
              <Radio value="Story">Story</Radio>
            </RadioGroup>
          </div>

          {/* Image Upload */}
          <div>
            <Button isIconOnly onPress={() => fileRef.current?.click()}>
              <FiUpload />
            </Button>
            <input
              ref={fileRef}
              multiple
              className="hidden"
              type="file"
              onChange={handleImageChange}
            />

            {/* Image Preview and Remove Feature */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {existingImages.map((src, idx) => (
                <div key={idx} className="relative">
                  <img
                    alt="Preview"
                    className="size-28 rounded-xl object-cover"
                    src={src}
                  />
                  <button
                    className="absolute top-1 right-3 bg-default-500 text-white rounded-full p-0.5"
                    onClick={() => handleRemoveExistingImage(idx)}
                  >
                    <LuX />
                  </button>
                </div>
              ))}
              {imagePreviews.map((src, idx) => (
                <div key={idx} className="relative">
                  <img
                    alt="Preview"
                    className="size-28 rounded-xl object-cover"
                    src={src}
                  />
                  <button
                    className="absolute top-1 right-3 bg-default-500 text-white rounded-full p-0.5"
                    onClick={() => handleRemoveImage(idx)}
                  >
                    <LuX />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={closeModal}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleUpdatePost}>
            Update Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
