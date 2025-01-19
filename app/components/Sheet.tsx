import { cn } from "~/utils/css";

export default function Sheet(props: { className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-iconic-3xl bg-paper-color outline outline-1 outline-border-color shadow-float",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
