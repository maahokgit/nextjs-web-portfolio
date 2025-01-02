import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import Style from "./Footer.module.css";

const Footer = async () => {

  return (
    <footer className={Style.Footer}>
      <p>
        Edward Ma <FontAwesomeIcon icon={faCopyright} color="white" /> Copyright{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
