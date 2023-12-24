import React from 'react';
import invariant from 'tiny-invariant';

// display keyline (the first sentence) and the rest with different colors
// the rest can be hidden in order to summarize the article

export default function Paragraph(props: { summarized: boolean; children?: React.ReactNode }) {
  let keyline: React.ReactNode[];
  let content: React.ReactNode[];

  // manipulating Children is not recommended.
  const children = React.Children.toArray(props.children);
  // find the index of the first child that is a string with a newline
  const index = children.findIndex((child) => {
    return typeof child === 'string' && child.includes('\n');
  });
  // If its a single sentence paragraph, which has no newline, all of it is the keyline
  if (index === -1) {
    keyline = children;
    content = [];
  } else {
    // define keyline as an array of ReactNodes before the first newline
    keyline = children.slice(0, index);
    keyline.push((children[index] as string).split('\n')[0]);
    // define content as an array of ReactNodes after the first newline
    content = [(children[index] as string).split('\n')[1]];
    content.push(...children.slice(index + 1));
  }
  return (
    <div className="my-6 font-lg">
      <span className="text-gray-700">{keyline}</span>
      {props.summarized ? null : <span className="text-gray-500">{content}</span>}
    </div>
  );
}
