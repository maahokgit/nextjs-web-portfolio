import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Style from "./SideBarDrawer.module.css";

interface ISideBarDrawerProps {
  clicked: () => void;
}

const SideBarDrawer = (props: ISideBarDrawerProps) => (
  <div className={Style.DrawerToggle} onClick={props.clicked}>
    <FontAwesomeIcon className={Style.Menu} icon={faBars} size="3x" color="white" />
  </div>
);

export default SideBarDrawer;
