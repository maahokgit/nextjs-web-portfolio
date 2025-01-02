import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import Style from "./Footer.module.css";
import { options } from "@/content/Content";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getData } from "@/lib/api";

const Footer = async () => {
  const footer = await getData().then((value) => {
    return value.footerCollection.items[0].footer.json;
  });

  return (
    <footer className={Style.Footer}>
      <p>
        Edward Ma <FontAwesomeIcon icon={faCopyright} color="white" /> Copyright{" "}
        {new Date().getFullYear()}
      </p>
      {footer ? documentToReactComponents(footer, options) : null}
    </footer>
  );
};

export default Footer;
