import type React from "react";

export default function List(props: { children?: React.ReactNode; ordered?: boolean }) {
  const Tag = props.ordered ? "ol" : "ul";
  return (
    <Tag
      className={
        props.ordered
          ? "my-6 ml-6 space-y-2 list-decimal list-outside"
          : "my-6 ml-6 space-y-2 list-disc list-outside"
      }
    >
      {props.children}
    </Tag>
  );
}
