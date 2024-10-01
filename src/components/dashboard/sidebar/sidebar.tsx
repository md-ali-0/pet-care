import React from "react";
import { Avatar, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router";

import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";

import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { CompaniesDropdown } from "./companies-dropdown";
import { Sidebar } from "./sidebar.styles";

export const SidebarWrapper = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <Box
      as="aside"
      css={{
        height: "100vh",
        zIndex: 202,
        position: "sticky",
        top: "0",
      }}
    >
      {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

      <Sidebar collapsed={collapsed}>
        <Sidebar.Header>
          <CompaniesDropdown />
        </Sidebar.Header>
        <Flex css={{ height: "100%" }} direction={"column"} justify={"between"}>
          <Sidebar.Body className="body sidebar">
            <SidebarItem
              href="/"
              icon={<HomeIcon />}
              isActive={router.pathname === "/"}
              title="Home"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                href="accounts"
                icon={<AccountsIcon />}
                isActive={router.pathname === "/accounts"}
                title="Accounts"
              />
              <SidebarItem
                icon={<PaymentsIcon />}
                isActive={router.pathname === "/payments"}
                title="Payments"
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              />

              <SidebarItem
                icon={<CustomersIcon />}
                isActive={router.pathname === "/customers"}
                title="Customers"
              />
              <SidebarItem
                icon={<ProductsIcon />}
                isActive={router.pathname === "/products"}
                title="Products"
              />
              <SidebarItem
                icon={<ReportsIcon />}
                isActive={router.pathname === "/reports"}
                title="Reports"
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                icon={<DevIcon />}
                isActive={router.pathname === "/developers"}
                title="Developers"
              />
              <SidebarItem
                icon={<ViewIcon />}
                isActive={router.pathname === "/view"}
                title="View Test Data"
              />
              <SidebarItem
                icon={<SettingsIcon />}
                isActive={router.pathname === "/settings"}
                title="Settings"
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                icon={<ChangeLogIcon />}
                isActive={router.pathname === "/changelog"}
                title="Changelog"
              />
            </SidebarMenu>
          </Sidebar.Body>
          <Sidebar.Footer>
            <Tooltip rounded color="primary" content={"Settings"}>
              <SettingsIcon />
            </Tooltip>
            <Tooltip rounded color="primary" content={"Adjustments"}>
              <FilterIcon />
            </Tooltip>
            <Tooltip rounded color="primary" content={"Profile"}>
              <Avatar
                size={"sm"}
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </Tooltip>
          </Sidebar.Footer>
        </Flex>
      </Sidebar>
    </Box>
  );
};
