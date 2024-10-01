import { Dropdown, Text } from "@nextui-org/react";
import React, { useState } from "react";

import { AcmeIcon } from "../icons/acme-icon";
import { AcmeLogo } from "../icons/acmelogo";
import { BottomIcon } from "../icons/sidebar/bottom-icon";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";

interface Company {
  name: string;
  location: string;
  logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
  const [company, setCompany] = useState<Company>({
    name: "Acme Co.",
    location: "Palo Alto, CA",
    logo: <AcmeIcon />,
  });

  return (
    <Dropdown borderWeight={"extrabold"} placement="bottom-right">
      <Dropdown.Trigger css={{ cursor: "pointer" }}>
        <Box>
          <Flex align={"center"} css={{ gap: "$7" }}>
            {company.logo}
            <Box>
              <Text
                h3
                css={{
                  m: 0,
                  color: "$accents9",
                  lineHeight: "$lg",
                  mb: "-$5",
                }}
                size={"$xl"}
                weight={"medium"}
              >
                {company.name}
              </Text>
              <Text
                span
                css={{ color: "$accents8" }}
                size={"$xs"}
                weight={"medium"}
              >
                {company.location}
              </Text>
            </Box>
            <BottomIcon />
          </Flex>
        </Box>
      </Dropdown.Trigger>
      <Dropdown.Menu
        aria-label="Avatar Actions"
        css={{
          $$dropdownMenuWidth: "340px",
          $$dropdownItemHeight: "60px",
          "& .nextui-dropdown-item": {
            py: "$2",
            // dropdown item left icon
            svg: {
              color: "$secondary",
              mr: "$4",
            },
            // dropdown item title
            "& .nextui-dropdown-item-content": {
              w: "100%",
              fontWeight: "$semibold",
            },
          },
        }}
        onAction={(e) => {
          if (e === "1") {
            setCompany({
              name: "Facebook",
              location: "San Fransico, CA",
              logo: <AcmeIcon />,
            });
          }
          if (e === "2") {
            setCompany({
              name: "Instagram",
              location: "Austin, Tx",
              logo: <AcmeLogo />,
            });
          }
          if (e === "3") {
            setCompany({
              name: "Twitter",
              location: "Brooklyn, NY",
              logo: <AcmeIcon />,
            });
          }
          if (e === "4") {
            setCompany({
              name: "Acme Co.",
              location: "Palo Alto, CA",
              logo: <AcmeIcon />,
            });
          }
        }}
      >
        <Dropdown.Section title="Companies">
          <Dropdown.Item
            key="1"
            description="San Fransico, CA"
            icon={<AcmeIcon />}
          >
            Facebook
          </Dropdown.Item>
          <Dropdown.Item key="2" description="Austin, Tx" icon={<AcmeLogo />}>
            Instagram
          </Dropdown.Item>
          <Dropdown.Item key="3" description="Brooklyn, NY" icon={<AcmeIcon />}>
            Twitter
          </Dropdown.Item>
          <Dropdown.Item
            key="4"
            description="Palo Alto, CA"
            icon={<AcmeIcon />}
          >
            Acme Co.
          </Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown>
  );
};
