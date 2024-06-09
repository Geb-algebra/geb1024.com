export default function (props: { children?: React.ReactNode }) {
  return (
    <div className="w-full aspect-video sticky top-0 py-4 backdrop-blur-md">{props.children}</div>
  );
}
