import { Grid2 as Grid, Link, Slide } from "@mui/material";
import Image from "next/image";
import React from "react";
import Style from "./page.module.css";
import selfie from "@/images/irisphoto.png";
import dartmouthtoastmasters from "@/images/dartmouthtoastmasters.jpg";
import MStJ from "@/images/mstj.jpeg";
import { options } from "@/content/Content";
import { getData } from "@/lib/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const HomePage: React.FC = async () => {
  const shortDescription = await getData().then((value) => {
    return value.pageAboutmeCollection.items[0].shortDescription.json;
  });

  const professionalDescription = await getData().then((value) => {
    return value.pageAboutmeCollection.items[0].professionalDescription.json;
  });

  const otherDescription = await getData().then((value) => {
    return value.pageAboutmeCollection.items[0].otherDescription.json;
  });

  const footer = await getData().then((value) => {
    return value.footerCollection.items[0].footer.json;
  });

  return (
    <>
      <Grid container spacing={5}>
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
          <Grid size={{ md: 4, xs: 12 }} className={Style.Picture}>
            <Image
              src={selfie}
              alt="i need a better pic"
              className={Style.selfie}
            />
          </Grid>
        </Slide>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Grid size={{ md: 8, xs: 12 }} className={Style.AboutMe}>
            {shortDescription
              ? documentToReactComponents(shortDescription, options)
              : null}
            {footer ? documentToReactComponents(footer, options) : null}
          </Grid>
        </Slide>
      </Grid>
      <Grid container spacing={5} className={Style.Container}>
        <Grid size={{ md: 6, xs: 12 }} className={Style.MoreAboutMe}>
          {professionalDescription
            ? documentToReactComponents(professionalDescription, options)
            : null}
        </Grid>
        <Grid size={{ md: 6, xs: 12 }} className={Style.Picture}>
          <figure>
            <Image
              src={dartmouthtoastmasters}
              alt="Dartmouth Toastmasters Executive"
              className={Style.MoreAboutMePic}
            />
            <figcaption>
              Dartmouth Toastmasters Executive Team, 2024-2025
            </figcaption>
          </figure>
        </Grid>
      </Grid>
      <Grid container spacing={5} className={Style.Container}>
        <Grid size={{ md: 6, xs: 12 }} className={Style.MoreAboutMe}>
          {otherDescription
            ? documentToReactComponents(otherDescription, options)
            : null}
        </Grid>
        <Grid size={{ md: 6, xs: 12 }} className={Style.Picture}>
          <figure>
            <Image
              src={MStJ}
              alt="acceptance into the order of st. john"
              className={Style.MoreAboutMePic}
            />
            <figcaption>
              Acceptance to the prestigious{" "}
              <a
                href="https://www.gg.ca/en/honours/canadian-honours/directory-honours/order-st-john"
                target="_blank"
                rel="noreferrer"
              >
                Order of St. John
              </a>
              , Priory Of Canada
            </figcaption>
          </figure>
        </Grid>
      </Grid>
      <Grid container spacing={5} style={{ marginTop: 100, marginBottom: 50 }}>
        <Grid size={{ xs: 12 }} style={{ textAlign: "center" }}>
          <h4>
            I’m always up for making new new connections and collaborations!
          </h4>
          <h4>
            <Link href="/contact">Drop me a line</Link> if you’d like to chat.
          </h4>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
