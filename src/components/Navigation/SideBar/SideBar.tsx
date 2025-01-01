import Logo from "@/components/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

import Style from "./SideBar.module.css";

interface ISideBarProps {
  open: boolean;
  closed: () => void;
}
const SideBar = (props: ISideBarProps) => {
  let attachedClasses = [Style.SideBar, Style.Close];

  if (props.open) {
    attachedClasses = [Style.SideBar, Style.Open];
  }
  return (
    <div className={attachedClasses.join(" ")} onClick={props.closed}>
      <div className={Style.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default SideBar;
