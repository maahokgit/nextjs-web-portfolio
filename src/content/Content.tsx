import { INLINES } from "@contentful/rich-text-types";

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