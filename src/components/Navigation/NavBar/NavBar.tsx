import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import SideBarDrawer from "../SideBar/SideBarDrawer/SideBarDrawer";

import Style from "./NavBar.module.css";
import Logo from "@/components/Logo/Logo";


interface INavBarProps {
  sideBarToggleClicked: () => void;
}

const NavBar = (props: INavBarProps) => (
  <header className={Style.NavBar}>
    <div className={Style.div}>
      <Logo />
      <nav className={Style.DeskTopOnly}>
        <NavigationItems />
      </nav>
      <SideBarDrawer clicked={props.sideBarToggleClicked} />
    </div>
  </header>
);

export default NavBar;
