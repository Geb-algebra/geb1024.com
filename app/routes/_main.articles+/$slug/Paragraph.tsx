import React from "react";
import invariant from "tiny-invariant";

// display keyline (the first sentence) and the rest with different colors
// the rest can be hidden in order to summarize the article

export default function Paragraph(props: { summarized: boolean; children?: React.ReactNode }) {
  // manipulating Children is not recommended.
  const children = React.Children.toArray(props.children);
  // get the index of first child that is a string and has \n
  const index = children.findIndex((child) => typeof child === "string" && child.includes("\n"));
  let keyline = [];
  let rest: typeof children = [];
  if (index === -1) {
    keyline = children;
    rest = [];
  } else {
    const sepChild = children[index];
    invariant(
      typeof sepChild === "string",
      `First child must be a string, found ${typeof sepChild}`,
    );
    keyline = [...children.slice(0, index), `${sepChild.split("\n")[0]}\n`];
    rest = [...sepChild.split("\n").slice(1).join("\n"), ...children.slice(index + 1)];
  }
  return (
    <p className="my-6 font-lg leading-7">
      <span className="text-text-main font-[500]">{keyline}</span>
      {props.summarized ? null : <span className="text-text-sub">{rest}</span>}
    </p>
  );
}
