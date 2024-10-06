import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Dispatch, FC, SetStateAction } from "react";

interface AlertProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  confirmHandler: () => void;
}

const Alert: FC<AlertProps> = ({ visible, setVisible, confirmHandler }) => {
  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="confirmation-modal"
        isOpen={visible}
        onClose={() => setVisible(false)}
      >
        <ModalContent>
          <ModalHeader>
            <h3 id="modal-title">Are you sure?</h3>
          </ModalHeader>
          <ModalBody>
            <p>
              Do you really want to perform this action? This process cannot be
              undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              onClick={() => setVisible(false)}
            >
              Cancel
            </Button>
            <Button color="danger" variant="solid" onClick={confirmHandler}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Alert;
