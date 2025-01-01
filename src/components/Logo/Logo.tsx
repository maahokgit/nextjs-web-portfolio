import Link from "next/link";
import Style from "./Logo.module.css";

const Logo = () => (
  <div className={Style.Home}>
    <Link href="/">Edward Ma</Link>
  </div>
);

export default Logo;
