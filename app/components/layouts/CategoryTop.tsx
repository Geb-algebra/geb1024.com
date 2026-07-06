export default function (props: {
  title: string;
  headerRight?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-12 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <h1 className="text-geb-blue text-4xl font-bold">{props.title}</h1>
        {props.headerRight ? <div className="md:justify-self-end">{props.headerRight}</div> : null}
      </div>
      {props.children}
    </div>
  );
}
