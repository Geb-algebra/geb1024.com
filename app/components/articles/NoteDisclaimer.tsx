import { TriangleAlertIcon } from "lucide-react";
import { cn } from "~/utils/css";

export const NOTE_DISCLAIMER_TEXT =
  "Notes are rough memos for capturing ideas as they come. They may be substantially revised or removed without notice. Since the ideas are usually turned into prose with AI assistance, they may contain inaccuracies.";

export default function NoteDisclaimer(props: { className?: string }) {
  return (
    <div
      className={cn(
        "grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-iconic-xl border border-border-color bg-base-color/70 px-4 py-3 text-sm leading-6 text-text-sub",
        props.className,
      )}
    >
      <TriangleAlertIcon className="mt-0.5 size-5 text-geb-blue" />
      <p className="min-w-0">{NOTE_DISCLAIMER_TEXT}</p>
    </div>
  );
}
