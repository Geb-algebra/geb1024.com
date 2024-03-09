import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { Outlet } from 'react-router-dom';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({});
}

export default function Index() {
  return (
    <div className="max-w-3xl mx-auto">
      <Outlet />
    </div>
  );
}
