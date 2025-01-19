import { Link } from "react-router";
import { cn } from "~/utils/css";
import { floating } from "./styles";

export default function LinkToSheet(props: {
  to: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={props.to}
      className={cn("rounded-iconic-3xl", props.className, floating.hover, floating.focusVisible)}
    >
      {props.children}
    </Link>
  );
}
