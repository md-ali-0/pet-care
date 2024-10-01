import { Collapse, Text } from "@nextui-org/react";
import React, { useState } from "react";

import { ChevronUpIcon } from "../icons/sidebar/chevron-up-icon";
import { Flex } from "../styles/flex";

interface Props {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

export const CollapseItems = ({ icon, items, title }: Props) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <Flex
      align={"center"}
      css={{
        gap: "$6",
        height: "100%",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Collapse
        css={{
          width: "100%",
          "& .nextui-collapse-view": {
            p: "0",
          },
          "& .nextui-collapse-content": {
            marginTop: "$1",
            padding: "0px",
          },
        }}
        divider={false}
        showArrow={false}
        title={
          <Flex
            css={{
              gap: "$6",
              width: "100%",
              py: "$5",
              px: "$7",
              borderRadius: "8px",
              transition: "all 0.15s ease",
              "&:active": {
                transform: "scale(0.98)",
              },
              "&:hover": {
                bg: "$accents2",
              },
            }}
            justify={"between"}
            onClick={handleToggle}
          >
            <Flex css={{ gap: "$6" }}>
              {icon}
              <Text
                span
                css={{
                  color: "$accents9",
                }}
                size={"$base"}
                weight={"normal"}
              >
                {title}
              </Text>
            </Flex>

            <ChevronUpIcon
              css={{
                transition: "transform 0.3s ease",
                transform: open ? "rotate(-180deg)" : "rotate(0deg)",
              }}
            />
          </Flex>
        }
      >
        {items.map((item, index) => (
          <Flex
            key={index}
            css={{
              paddingLeft: "$16",
            }}
            direction={"column"}
          >
            <Text
              span
              css={{
                color: "$accents8",
                cursor: "pointer",
                "&:hover": {
                  color: "$accents9",
                },
              }}
              size={"$md"}
              weight={"normal"}
            >
              {item}
            </Text>
          </Flex>
        ))}
      </Collapse>
    </Flex>
  );
};
