"use client";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import headshot from "@/images/headshot.png";
import Style from "./page.module.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "@/components/Spinner/Spinner";
import {
  TextField,
  Button,
  Grid2 as Grid,
  Slide,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { customTheme } from "@/lib/customTheme";

const ContactPage = () => {
  const [validateEmail, setValidateEmail] = useState(false);
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const validateEmailHandler = (event: any) => {
    const emailReg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailReg.test(event.target.value)) {
      setValidateEmail(true);
      setMessage("");
    } else {
      setValidateEmail(false);
      setMessage("Please enter a valid email");
    }
  };

  const outerTheme = useTheme();

  const sendEmail = (e: any) => {
    setSending(true);
    e.preventDefault();
    emailjs
      .sendForm(
        `${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}`,
        e.target,
        {
          publicKey: `${process.env.NEXT_PUBLIC_EMAILJS_USER_ID}`,
        }
      )
      .then(
        (result) => {
          if (result) {
            setSending(false);
            setFormSuccess(true);
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const formInput = (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <TextField
        id="standard-basic"
        label="Your Name"
        margin="normal"
        type="text"
        name="from_name"
        variant="standard"
      />
      <TextField
        id="standard-basic"
        label="Your Email"
        margin="normal"
        type="email"
        name="from_name"
        variant="standard"
        helperText={message}
        onChange={(e) => validateEmailHandler(e)}
      />
      <TextField
        id="standard-multiline-static"
        name="message"
        label="Your Message"
        margin="normal"
        multiline
        variant="standard"
      />
      <Button
        className={Style.button}
        type="submit"
        size="large"
        disabled={!validateEmail}
        endIcon={<FontAwesomeIcon icon={faPaperPlane} />}
      >
        Submit
      </Button>
    </ThemeProvider>
  );

  return (
    <Grid container spacing={5} className={Style.formContainer}>
      <Slide direction="right" in={true} mountOnEnter unmountOnExit>
        <Grid size={{ md: 5, xs: 12 }}>
          <Image src={headshot} alt="headshot" width={480} height={626} />
        </Grid>
      </Slide>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Grid size={{ md: 7, xs: 12 }}>
          <h4>
            I’m always up for making new new connections and collaborations!
          </h4>
          <h4>Drop me a line if you’d like to chat.</h4>
          <form className={Style.ContactForm} onSubmit={sendEmail}>
            {sending ? (
              <Spinner />
            ) : formSuccess ? (
              <h3>
                Message Sent! Thank you! <br /> <br />I will get back to you as
                soon as I see it!
              </h3>
            ) : (
              formInput
            )}
          </form>
        </Grid>
      </Slide>
    </Grid>
  );
};

export default ContactPage;
