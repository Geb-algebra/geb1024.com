import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({});
}

export const meta: MetaFunction = () => {
  return [{ title: '' }];
};

export default function Page() {
  return (
    <div className="flex justify-center">
      <div></div>
    </div>
  );
}
