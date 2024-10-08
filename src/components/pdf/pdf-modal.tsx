import { handleUserTestReportPdf } from "@/utils/pdf-print";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/modal";
import { FC, useState } from "react";

interface PDFModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

const PDFModal: FC<PDFModalProps> = ({ isOpen, onOpenChange }) => {
    const [age, setAge] = useState(0);
    const [weight, setWeight] = useState(0);

    const handlePDF = () => {
        handleUserTestReportPdf({ age, weight });
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Generate Feeding Chart
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                type="number"
                                label="Age (in years)"
                                placeholder="Enter pet's age"
                                value={age.toString()}
                                onChange={(e) => setAge(Number(e.target.value))}
                                variant="bordered"
                            />
                            <Input
                                type="number"
                                label="Weight (in lbs)"
                                placeholder="Enter pet's weight"
                                value={weight.toString()}
                                onChange={(e) =>
                                    setWeight(Number(e.target.value))
                                } // Update weight state
                                variant="bordered"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="flat"
                                onPress={onClose}
                            >
                                Close
                            </Button>
                            <Button
                                color="primary"
                                onPress={() => {
                                    handlePDF();
                                    onClose();
                                }}
                            >
                                Generate PDF
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default PDFModal;
