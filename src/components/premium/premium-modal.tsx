import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/modal";
import { Dispatch, FC, SetStateAction } from "react";

interface PremiumModalProps {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}

const PremiumModal: FC<PremiumModalProps> = ({ visible, setVisible }) => {
    const closeModal = () => setVisible(false);
    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            isOpen={visible}
            onClose={closeModal}
        >
            <ModalContent>
                <ModalHeader>
                    <h3 id="modal-title" className="text-lg">
                        Premium Package
                    </h3>
                </ModalHeader>
                <ModalBody>
                    <div className="flex justify-center">
                        <h3 className="text-lg">1 Month Subscription</h3>
                    </div>
                    <div className="flex justify-center">
                        <h3 style={{ textAlign: "center" }}>
                            Enjoy exclusive features, monitize, and premium
                            budget with our 1-month premium package.
                        </h3>
                    </div>
                    <div className="flex justify-center">
                        <h3 className="text-xl">৳ 1000 </h3>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="flat" color="danger" onPress={closeModal}>
                        Cancel
                    </Button>
                    <Button as={Link} color="primary" href="/pay">
                        Subscribe Now
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PremiumModal;
