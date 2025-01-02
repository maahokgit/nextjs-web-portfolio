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
      employer
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

const contentSpaceID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE;
const contentToken = process.env.CONTENTFUL_DELIVERY_API;

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
