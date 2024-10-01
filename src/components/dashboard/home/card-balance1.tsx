import { Card, Text } from "@nextui-org/react";
import React from "react";

import { Community } from "../icons/community";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";

export const CardBalance1 = () => {
  return (
    <Card
      css={{
        mw: "375px",
        bg: "$blue600",
        borderRadius: "$xl",
        px: "$6",
      }}
    >
      <Card.Body css={{ py: "$10" }}>
        <Flex css={{ gap: "$5" }}>
          <Community />
          <Flex direction={"column"}>
            <Text span css={{ color: "white" }}>
              Auto Insurance
            </Text>
            <Text span css={{ color: "white" }} size={"$xs"}>
              1311 Cars
            </Text>
          </Flex>
        </Flex>
        <Flex align={"center"} css={{ gap: "$6", py: "$4" }}>
          <Text span css={{ color: "white" }} size={"$xl"} weight={"semibold"}>
            $45,910
          </Text>
          <Text span css={{ color: "$green600" }} size={"$xs"}>
            + 4.5%
          </Text>
        </Flex>
        <Flex align={"center"} css={{ gap: "$12" }}>
          <Box>
            <Text
              span
              css={{ color: "$green600" }}
              size={"$xs"}
              weight={"semibold"}
            >
              {"↓"}
            </Text>
            <Text span css={{ color: "$white" }} size={"$xs"}>
              100,930 USD
            </Text>
          </Box>
          <Box>
            <Text
              span
              css={{ color: "$red600" }}
              size={"$xs"}
              weight={"semibold"}
            >
              {"↑"}
            </Text>
            <Text span css={{ color: "$white" }} size={"$xs"}>
              54,120 USD
            </Text>
          </Box>
          <Box>
            <Text
              span
              css={{ color: "$green600" }}
              size={"$xs"}
              weight={"semibold"}
            >
              {"⭐"}
            </Text>
            <Text span css={{ color: "$white" }} size={"$xs"}>
              125 VIP
            </Text>
          </Box>
        </Flex>
      </Card.Body>
    </Card>
  );
};
