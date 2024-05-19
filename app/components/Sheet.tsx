export default function Sheet(props: { className: string; children: React.ReactNode }) {
  return (
    <div
      className={`rounded-iconic-3xl bg-paper-color shadow-[0_0_12px_rgba(0,0,0,0.1)] ${props.className}`}
    >
      {props.children}
    </div>
  );
}
