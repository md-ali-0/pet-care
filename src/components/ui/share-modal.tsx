import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { useState } from "react";
import { FaShare } from "react-icons/fa";
import { LuLink2 } from "react-icons/lu";
import { toast } from "sonner";

interface ShareModalProps {
  id: string;
}

export function ShareModal({ id }: ShareModalProps) {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => setVisible(false);

  const copyToClipboard = () => {
    const url = `${window.location.origin}/bike-details/${id}`;

    navigator.clipboard.writeText(url);
    toast.success("Link Copied");
    setVisible(false);
  };

  return (
    <>
      <button
        className="flex select-none items-center transition-colors duration-300 transform hover:text-success-500 space-x-1"
        onClick={handler}
      >
        <FaShare />
        <span className="hidden sm:block">Share</span>
      </button>
      <Modal className="select-none" isOpen={visible} onClose={closeHandler}>
        <ModalContent>
          <ModalHeader>
            <h3 className="text-[18px]" id="modal-title">
              Share
            </h3>
          </ModalHeader>
          <ModalBody>
            <h3>Share this link via</h3>
            <div className="flex justify-center items-center gap-2">
              <LuLink2 size={25} />
              <Input
                readOnly
                aria-label="Share link"
                className="w-full"
                value={`${window.location.origin}/bike-details/${id}`}
                variant="bordered"
              />
              <Button
                color="primary"
                variant="bordered"
                onClick={copyToClipboard}
              >
                Copy
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
