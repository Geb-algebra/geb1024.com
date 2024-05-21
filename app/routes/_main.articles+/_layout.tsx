import { Outlet } from "react-router-dom";

export default function Index() {
  return (
    <div className="max-w-4xl mx-auto">
      <Outlet />
    </div>
  );
}
