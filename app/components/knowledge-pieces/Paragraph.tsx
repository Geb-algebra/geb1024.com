export default function Paragraph(props: { children?: React.ReactNode }) {
  return <p className="my-6 font-md leading-7">{props.children}</p>;
}
