import React from 'react';

export default function Quote(props: { children?: React.ReactNode }) {
  const children = React.Children.toArray(props.children).map((child) => {
    if (React.isValidElement(child) && typeof child.type === 'function' && child.type.name === 'p')
      return <p key={child.key}>{child.props.children}</p>;
    else return child;
  });
  return <blockquote className="pl-3 border-l-4 my-6 text-sharp-gray">{children}</blockquote>;
}
