import { type MetaFunction, json, type LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({});
}

export const meta: MetaFunction = () => {
  return [{ title: '8bit stack' }];
};

export default function Index() {
  return <p>Hello</p>;
}
