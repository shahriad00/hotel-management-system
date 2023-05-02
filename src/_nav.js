import {
  cilDescription,
  cilSpeedometer,
  cilStar,
  cilHome,
  cilArrowRight,
  cilAddressBook,
} from "@coreui/icons";
import React from "react";
import CIcon from "@coreui/icons-react";
import { CNavGroup, CNavItem} from "@coreui/react";

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
      {
        component: CNavItem,
        name: "Check Outs",
        to: "/all-check-outs",
        icon: <CIcon icon={cilArrowRight} customClassName="nav-icon" />
      },
    ],
  },
  {
    component: CNavItem,
    name: "Reference",
    to: "/reference",
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Pages",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Login",
        to: "/login",
      },
      {
        component: CNavItem,
        name: "Register",
        to: "/register",
      },
      {
        component: CNavItem,
        name: "Error 404",
        to: "/404",
      },
      {
        component: CNavItem,
        name: "Error 500",
        to: "/500",
      },
    ],
  },
];

export default _nav;
