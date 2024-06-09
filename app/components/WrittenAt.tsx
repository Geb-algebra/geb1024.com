export default function writtenAt(props: { date: Date }) {
  const dateString = props.date.toLocaleDateString();
  return <p className="text-geb-gray text-xs mt-auto md:text-sm">{dateString}</p>;
}
