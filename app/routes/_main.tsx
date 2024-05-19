import type { MetaFunction } from "@remix-run/cloudflare";
import { Link, Outlet } from "@remix-run/react";
import GebMoon from "~/components/GebMoon.tsx";
import GitHub from "~/components/logos/GitHub";
import X from "~/components/logos/X";
import Zenn from "~/components/logos/Zenn";

export const meta: MetaFunction = () => {
  return [{ title: "Geb's Lab" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  return (
    <div className="bg-base-color w-full h-screen">
      <div className="fixed w-full flex h-20 z-50">
        <aside className="w-42 pl-2 pt-2">
          <Link
            to="/articles"
            prefetch="viewport"
            className="block w-32 h-32 m-1 pl-0.5 pt-0.5 bg-geb-blue ring-2 ring-offset-2 ring-geb-blue rounded-iconic-3xl"
          >
            <GebMoon color="#02ac8e" />
          </Link>
          <div className="w-32 p-4 mt-8 mx-1 h-fit">
            <a href="https://github.com/Geb-algebra">
              <GitHub color="black" className="w-12 h-12 mb-8 mx-auto" />
            </a>
            <a href="https://x.com/GebAlgebra">
              <X color="black" className="w-10 h-10 mb-8 mx-auto" />
            </a>
            <a href="https://zenn.dev/geb">
              <Zenn color="black" className="w-10 h-10 mb-8 mx-auto" />
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
