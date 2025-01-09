import { Link } from "react-router";

export default function LinkToSheet(props: { to: string; children?: React.ReactNode }) {
  return (
    <Link
      to={props.to}
      className="rounded-iconic-3xl hover:scale-105 hover:bg-paper-color hover:shadow-float transition-all duration-500"
    >
      {props.children}
    </Link>
  );
}
