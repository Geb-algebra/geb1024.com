import { type LoaderFunctionArgs, type MetaFunction, json } from "@remix-run/cloudflare";
import { HeadersFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import gsap from "gsap";
import GebMoon from "~/components/GebMoon.tsx";
import GitHub from "~/components/logos/GitHub.tsx";

export const meta: MetaFunction = () => {
  return [{ title: "Geb's Lab" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  return (
    <div className="bg-base-color w-full h-screen">
      <div className="fixed w-full flex h-20 z-50">
        <aside className="w-42 pl-2 pt-2">
          <Link
            to="/"
            prefetch="viewport"
            className="block w-36 h-36 pl-0.5 pt-0.5 bg-geb-blue rounded-iconic-3xl border-base-color border-double border-8"
          >
            <GebMoon color="#02ac8e" />
          </Link>
          <div className="w-36 p-4 mt-8 h-fit">
            <a href="https://github.com/Geb-algebra">
              <GitHub color="black" className="w-12 h-12 mx-auto" />
            </a>
          </div>
        </aside>
      </div>
      <div className="ml-36">
        <main>
          <h1 className="p-6 mb-24 flex-1 h-16 text-3xl font-bold text-geb-blue">Geb's Lab</h1>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
