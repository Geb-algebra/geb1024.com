import invariant from 'tiny-invariant';

export default function Paragraph(props: { children?: React.ReactNode }) {
  // console.log(props.children, typeof props.children);
  // invariant(typeof props.children === 'string', 'Paragraph children must be a string');
  // const keyline = props.children.split('\n')[0];
  // const content = props.children.split('\n').slice(1).join('\n');
  return (
    <div className="mb-8">
      {props.children}
      {/* <div className="text-gray-700">{keyline}</div>
      <div className="text-gray-500">{content}</div> */}
    </div>
  );
}
