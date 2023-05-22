import {
  cilDescription,
  cilSpeedometer,
  cilHome,
  cilArrowRight,
  cilAddressBook,
  cilCash,
  cilShareBoxed,
  cilDollar,
} from "@coreui/icons";
import React from "react";
import CIcon from "@coreui/icons-react";
import { CNavGroup, CNavItem, CNavTitle} from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    component: CNavTitle,
    name: 'Rooms',
  },
  {
    component: CNavGroup,
    name: "Manage Rooms",
    to: "/manage-rooms",
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: " Room types",
        to: "/manage-rooms/room-types",
        icon: <CIcon icon={cilArrowRight} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: "Rooms",
        to: "/manage-rooms/rooms",
        icon: <CIcon icon={cilArrowRight} customClassName="nav-icon" />
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Check In',
  },
  {
    component: CNavGroup,
    name: "Check In",
    to: "/check-in",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Online Booking",
        to: "/check-in/online-booking",
        icon: <CIcon icon={cilArrowRight} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: "All Online Booking",
        to: "/check-in/all-online-booking",
        icon: <CIcon icon={cilArrowRight} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: "Add Check In",
        to: "/check-in/add-check-in",
        icon: <CIcon icon={cilArrowRight} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: "All Check In's",
        to: "/check-in/all-check-ins",
        icon: <CIcon icon={cilArrowRight} customClassName="nav-icon" />
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Check Out',
  },
  {
    component: CNavItem,
    name: "Check Outs",
    to: "/all-check-outs",
    icon: <CIcon icon={cilShareBoxed} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'Utils',
  },
  {
    component: CNavItem,
    name: "Reference",
    to: "/reference",
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Total Income",
    to: "/total-income",
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Total Expense",
    to: "/total-expense",
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Total Report",
    to: "/total-report",
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  },
];

export default _nav;
