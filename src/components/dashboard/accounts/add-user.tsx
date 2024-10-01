import { Button, Divider, Input, Modal, Text } from "@nextui-org/react";
import React from "react";

import { Flex } from "../styles/flex";

export const AddUser = () => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <div>
      <Button auto onClick={handler}>
        Add User
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        width="600px"
        onClose={closeHandler}
      >
        <Modal.Header css={{ justifyContent: "start" }}>
          <Text h4 id="modal-title">
            Add new user
          </Text>
        </Modal.Header>
        <Divider css={{ my: "$5" }} />
        <Modal.Body css={{ py: "$10" }}>
          <Flex
            css={{
              flexWrap: "wrap",
              gap: "$8",
              "@lg": { flexWrap: "nowrap", gap: "$12" },
            }}
            direction={"column"}
          >
            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                bordered
                clearable
                fullWidth
                label="First Name"
                placeholder="First Name"
                size="lg"
              />
              <Input
                bordered
                clearable
                fullWidth
                label="Last Name"
                placeholder="Last Name"
                size="lg"
              />
            </Flex>

            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                bordered
                clearable
                fullWidth
                label="Email"
                placeholder="Email"
                size="lg"
              />
              <Input
                bordered
                clearable
                fullWidth
                label="Phone Number"
                placeholder="Phone Number"
                size="lg"
              />
            </Flex>
            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                bordered
                clearable
                fullWidth
                label="Department"
                placeholder="Department"
                size="lg"
              />
              <Input
                bordered
                clearable
                fullWidth
                label="Company"
                placeholder="Company"
                size="lg"
              />
            </Flex>
          </Flex>
        </Modal.Body>
        <Divider css={{ my: "$5" }} />
        <Modal.Footer>
          <Button auto onClick={closeHandler}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
