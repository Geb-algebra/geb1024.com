import { type MetaFunction, json, type LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from 'react-router-dom';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({});
}

export const meta: MetaFunction = () => {
  return [{ title: '8bit stack' }];
};

export default function Index() {
  return (
    <div className="max-w-3xl mx-auto">
      <Outlet />
    </div>
  );
}
