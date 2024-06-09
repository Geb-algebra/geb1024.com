import { Link } from "@remix-run/react";

export default function LinkToSheet(props: { to: string; children?: React.ReactNode }) {
  return (
    <Link
      to={props.to}
      className="rounded-iconic-xl md:rounded-iconic-3xl hover:scale-105 hover:bg-paper-color hover:shadow-float transition-all duration-500"
    >
      {props.children}
    </Link>
  );
}
