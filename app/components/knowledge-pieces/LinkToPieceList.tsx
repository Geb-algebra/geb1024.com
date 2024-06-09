export default function RelatedPieceList(props: { children?: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{props.children}</div>;
}
