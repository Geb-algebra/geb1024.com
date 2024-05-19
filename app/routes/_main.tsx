import type { MetaFunction } from "@remix-run/cloudflare";
import { Link, Outlet } from "@remix-run/react";
import GebMoon from "~/components/GebMoon.tsx";
import ArticleIcon from "~/components/icons/ArticleIcon";
import HomeIcon from "~/components/icons/HomeIcon";
import PersonIcon from "~/components/icons/PersonIcon";
import GitHub from "~/components/logos/GitHub";
import X from "~/components/logos/X";
import Zenn from "~/components/logos/Zenn";

export const meta: MetaFunction = () => {
  return [{ title: "Geb's Lab" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  return (
    <div className="bg-base-color w-full h-screen">
      <aside className="w-42 pl-2 pt-2 fixed">
        <Link
          to="/articles"
          prefetch="viewport"
          className="block w-32 h-32 m-1 pl-0.5 pt-0.5 bg-geb-blue ring-2 ring-offset-2 ring-geb-blue rounded-iconic-3xl"
        >
          <GebMoon color="#02ac8e" />
        </Link>
        <div className="w-32 mt-8 mx-1 h-fit flex flex-col items-center gap-8">
          <h1 className="text-2xl font-bold text-geb-blue">Geb's Lab</h1>
          <Link to="/">
            <HomeIcon
              type="solid"
              className="w-10 h-10 text-geb-blue hover:scale-110 transition-transform duration-300"
            />
          </Link>
          <Link to="/about">
            <PersonIcon
              type="solid"
              className="w-10 h-10 text-geb-blue hover:scale-110 transition-transform duration-300"
            />
          </Link>
          <Link to="/articles">
            <ArticleIcon
              type="solid"
              className="w-10 h-10 text-geb-blue hover:scale-110 transition-transform duration-300"
            />
          </Link>
          <div className="h-0 border border-twilight-gray w-12" />
          <a href="https://github.com/Geb-algebra">
            <GitHub
              color="black"
              className="w-10 h-10 hover:scale-110 transition-transform duration-300"
            />
          </a>
          <a href="https://x.com/GebAlgebra">
            <X
              color="black"
              className="w-8 h-8 hover:scale-110 transition-transform duration-300"
            />
          </a>
          <a href="https://zenn.dev/geb">
            <Zenn
              color="black"
              className="w-8 h-8 hover:scale-110 transition-transform duration-300"
            />
          </a>
        </div>
      </aside>
      <main className="ml-36 p-32">
        <Outlet />
      </main>
    </div>
  );
}
