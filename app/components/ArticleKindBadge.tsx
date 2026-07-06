import { cn } from "~/utils/css";

export default function ArticleKindBadge(props: { kind: "article" | "note"; className?: string }) {
  if (props.kind !== "note") {
    return null;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-iconic-md border border-sub-color/70 bg-paper-color px-2 py-0.5 text-xs font-bold tracking-normal text-text-sub",
        props.className,
      )}
    >
      Note
    </span>
  );
}
