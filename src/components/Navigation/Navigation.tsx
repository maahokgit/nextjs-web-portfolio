"use client"
import { useState } from "react";
import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";

const Navigation = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  const SideBarClosedHandler = () => {
    setShowSideBar(false);
  };

  const SideBarToggleHandler = () => {
    setShowSideBar(!showSideBar);
  };
  return (
    <>
      <NavBar sideBarToggleClicked={SideBarToggleHandler} />
      <SideBar open={showSideBar} closed={SideBarClosedHandler} />
    </>
  );
};

export default Navigation;
