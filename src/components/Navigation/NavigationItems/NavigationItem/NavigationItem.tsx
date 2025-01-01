import Link from "next/link";
import Style from "./NavigationItem.module.css";
import { usePathname } from "next/navigation";

interface INavigationItemProps {
  link: string;
  children: React.ReactNode;
}

const NavigationItem = (props: INavigationItemProps) => {
  const currentPath = usePathname();
  const className = currentPath === props.link ? Style.active : "";

  return (
    <li className={Style.Items}>
      <Link href={props.link} className={className}>
        {props.children}
      </Link>
    </li>
  );
};

export default NavigationItem;
