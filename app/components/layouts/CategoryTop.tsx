export default function (props: { title: string; children?: React.ReactNode }) {
  return (
    <div>
      <h1 className="text-geb-blue text-4xl font-bold mb-12">{props.title}</h1>
      {props.children}
    </div>
  );
}
