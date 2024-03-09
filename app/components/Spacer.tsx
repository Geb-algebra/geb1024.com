export default function Spacer(props: { w?: number; h?: number }) {
  return <div style={{ width: (props.w ?? 6) * 4, height: (props.h ?? 6) * 4 }} />;
}
