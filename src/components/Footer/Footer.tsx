"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import Style from "./Footer.module.css";
import { getData, options } from "@/content/Content";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useState, useEffect } from "react";

const Footer = () => {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    console.log(process.env);
    getData().then((value) => {
      setFooter(value.footerCollection.items[0].footer.json);
    });
  }, []);

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
