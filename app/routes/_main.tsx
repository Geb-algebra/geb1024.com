import { type MetaFunction, json, type LoaderFunctionArgs } from '@remix-run/node';
import { Link, Outlet } from '@remix-run/react';
import GebMoon from '~/components/GebMoon.tsx';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({});
}

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

function NavItem(props: { name: string; href: string }) {
  return (
    <Link to={props.href} className="text-accent-wine">
      {props.name}
    </Link>
  );
}

export default function Index() {
  return (
    <div className="bg-base-color w-full h-screen">
      <div className="fixed w-full flex h-20 z-50">
        <aside className="w-42 pl-2 pt-2">
          <Link
            to="/"
            className="block w-36 h-36 pl-0.5 pt-0.5 bg-geb-blue rounded-iconic-3xl border-base-color border-double border-8"
          >
            <GebMoon color="#02ac8e" />
          </Link>
          <div className="w-20 p-4 h-fit border-geb-blue rounded-iconic-3xl border-b-0 border-l-8 border-double">
            <div className="w-16 h-16 my-8 rounded-full bg-gray-400">GitHub</div>
            <div className="w-16 h-16 my-8 rounded-full bg-gray-400">Twitter</div>
            <div className="w-16 h-16 my-8 rounded-full bg-gray-400">LinkedIn</div>
          </div>
        </aside>
        <nav className="w-full h-20 flex justify-stretch item-start py-2 backdrop-blur-xl bg-base-color bg-opacity-50">
          <h1 className="px-6 border-t-8 border-double border-geb-blue flex-1 h-16 flex items-center text-3xl font-bold text-geb-blue">
            Geb's Lab
          </h1>

          <div className="h-16 px-16 mr-4 flex gap-6 items-center border-t-8 border-r-0 border-double border-geb-blue rounded-iconic-3xl">
            <NavItem name="Articles" href="/articles" />
            <NavItem name="About Me" href="/about" />
            <NavItem name="Contact" href="/contact" />
          </div>
        </nav>
      </div>
      <div className="ml-48">
        <main className="mr-6 pt-28">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
