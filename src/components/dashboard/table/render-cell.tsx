import { Col, Row, User, Text, Tooltip } from "@nextui-org/react";
import React from "react";

import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";

import { users } from "./data";
import { IconButton, StyledBadge } from "./table.styled";

interface Props {
  user: (typeof users)[number];
  columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = user[columnKey];

  switch (columnKey) {
    case "name":
      return (
        <User squared css={{ p: 0 }} name={cellValue} src={user.avatar}>
          {user.email}
        </User>
      );
    case "role":
      return (
        <Col>
          <Row>
            <Text b css={{ tt: "capitalize" }} size={14}>
              {cellValue}
            </Text>
          </Row>
          <Row>
            <Text b css={{ tt: "capitalize", color: "$accents7" }} size={13}>
              {user.team}
            </Text>
          </Row>
        </Col>
      );
    case "status":
      return (
        // @ts-ignore
        <StyledBadge type={String(user.status)}>{cellValue}</StyledBadge>
      );

    case "actions":
      return (
        <Row
          align="center"
          css={{ gap: "$8", "@md": { gap: 0 } }}
          justify="center"
        >
          <Col css={{ d: "flex" }}>
            <Tooltip content="Details">
              <IconButton onClick={() => console.log("View user", user.id)}>
                <EyeIcon fill="#979797" size={20} />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit user">
              <IconButton onClick={() => console.log("Edit user", user.id)}>
                <EditIcon fill="#979797" size={20} />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip
              color="error"
              content="Delete user"
              onClick={() => console.log("Delete user", user.id)}
            >
              <IconButton>
                <DeleteIcon fill="#FF0080" size={20} />
              </IconButton>
            </Tooltip>
          </Col>
        </Row>
      );
    default:
      return cellValue;
  }
};
