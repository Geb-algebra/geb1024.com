import React, { ReactNode } from "react";
import invariant from "tiny-invariant";

// display keyline (the first sentence) and the rest with different colors
// the rest can be hidden in order to summarize the article

export default function Paragraph(props: { summarized: boolean; children?: React.ReactNode }) {
  // manipulating Children is not recommended.
  const children = React.Children.toArray(props.children);
  const firstSentence = children[0];
  invariant(typeof firstSentence === "string", "The beginning of a paragraph must be a string");
  const [keyline, ...rest] = firstSentence.split("\n");
  return (
    <div className="my-6 font-lg leading-7">
      <span className="text-text-main font-[500]">{keyline}</span>
      {props.summarized ? null : (
        <span className="text-text-sub">{[rest.join(""), ...children.slice(1)]}</span>
      )}
    </div>
  );
}
