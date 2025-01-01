import { useEffect, useState } from "react";
import { INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardContent,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import Style from "./Content.module.css";
import Spinner from "@/components/Spinner/Spinner";
// GraphQL Query
const query = `
{
  pageAboutmeCollection {
    items {
      shortDescription {
        json
      }
      professionalDescription {
        json
      }
      otherDescription {
        json
      }
    }
  }
  workExperienceCollection {
    items{
      jobTitle
      employer{
        json
      }
      startEndDate
      description{
        json
      }
    }
  }
  footerCollection{
    items{
      footer{
        json
      }
    }
  }
}
`;

const contentSpaceID = process.env.CONTENTFUL_SPACE;
const contentToken = process.env.CONTENTFUL_DELIVERY_API;

export const options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: any) => {
      return (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {node.content[0].value}
        </a>
      );
    },
  },
};

export const getData = async () =>
  await fetch(
    `https://graphql.contentful.com/content/v1/spaces/` + contentSpaceID,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + contentToken,
      },
      body: JSON.stringify({ query }),
    }
  )
    .then((response) => response.json())
    .then(({ data, errors }) => {
      if (errors) {
        console.log(errors);
      }
      // rerender the entire component with new data
      return data;
    });

export const ProfDescription = () => {
  const [profDescription, setProfDescription] = useState(null);
  useEffect(() => {
    getData().then((value) =>
      setProfDescription(
        value.pageAboutmeCollection.items[0].professionalDescription.json
      )
    );
  }, []);
  if (profDescription) {
    return <>{documentToReactComponents(profDescription, options)}</>;
  }
};

export const ShortDescription = () => {
  const [shortDescription, setShortDescription] = useState(null);
  useEffect(() => {
    getData().then((value) =>
      setShortDescription(
        value.pageAboutmeCollection.items[0].shortDescription.json
      )
    );
  }, []);

  if (shortDescription) {
    return <>{documentToReactComponents(shortDescription, options)}</>;
  }
};

export const OtherDescription = () => {
  const [otherDescription, setOtherDescription] = useState(null);
  useEffect(() => {
    getData().then((value) =>
      setOtherDescription(
        value.pageAboutmeCollection.items[0].otherDescription.json
      )
    );
  }, []);

  if (otherDescription) {
    return <>{documentToReactComponents(otherDescription, options)}</>;
  }
};

export const JobExperience = () => {
  const [experience, setExperience] = useState<any>();

  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  useEffect(() => {
    getData().then((value) =>
      setExperience(value.workExperienceCollection.items)
    );
  }, []);

  let jobs;

  if (experience && experience.length > 0) {
    jobs = experience.map((job: any, index: any) => (
      <Grid container className={Style.Row} key={index}>
        <Accordion
          expanded={expanded}
          onChange={handleChange}
          className={Style.Card}
        >
          <AccordionSummary>
            <CardContent className={Style.CardText}>
              <Typography variant="h6">{job.jobTitle}</Typography>
              <Typography variant="subtitle1">
                {documentToReactComponents(job.employer.json, options)}
              </Typography>
              <Typography variant="subtitle1">{job.startEndDate}</Typography>
            </CardContent>
          </AccordionSummary>
          <AccordionDetails>
            <CardContent className={Style.CardText}>
              {documentToReactComponents(job.description.json, options)}
            </CardContent>
          </AccordionDetails>
        </Accordion>
      </Grid>
    ));
  } else {
    jobs = <Spinner />;
  }

  return jobs;
};
