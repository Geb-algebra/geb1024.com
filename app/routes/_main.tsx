import type { MetaFunction } from "@remix-run/cloudflare";
import { Link, Outlet } from "@remix-run/react";
import { useState } from "react";
import GebMoon from "~/components/GebMoon.tsx";
import ArticleIcon from "~/components/icons/ArticleIcon";
import HanburgerIcon from "~/components/icons/HanburgerIcon";
import HomeIcon from "~/components/icons/HomeIcon";
import PersonIcon from "~/components/icons/PersonIcon";
import GitHub from "~/components/logos/GitHub";
import X from "~/components/logos/X";
import Zenn from "~/components/logos/Zenn";

export const meta: MetaFunction = () => {
  return [
    { title: "Geb's Lab" },
    {
      name: "description",
      content: "An engineer's knowledges about tech, communication, team building, etc.",
    },
  ];
};

export default function Index() {
  const [openNav, setOpenNav] = useState(false);

  return (
    <div className="bg-base-color w-full h-screen">
      <nav className="hidden md:block w-42 pl-2 pt-2 fixed">
        <Link
          to="/articles"
          prefetch="viewport"
          className="block w-32 h-32 rounded-iconic-3xl m-1 pl-0.5 pt-0.5 bg-geb-blue ring-2 ring-offset-2 ring-geb-blue"
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
          <div className="h-0 border border-border-color w-12" />
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
      </nav>
      <nav className="md:hidden flex items-center gap-4 p-2">
        <Link
          to="/articles"
          prefetch="viewport"
          className="block w-16 h-16 rounded-iconic-xl pl-0.5 pt-0.5 bg-geb-blue ring-1 ring-offset-1 ring-geb-blue"
        >
          <GebMoon color="#02ac8e" />
        </Link>
        <h1 className="text-2xl font-bold text-geb-blue flex-grow">Geb's Lab</h1>
        <div className="pr-2">
          <button type="button" onClick={() => setOpenNav(!openNav)}>
            <HanburgerIcon className="w-10 h-10 text-geb-blue" />
          </button>
          {openNav && (
            <div
              onClick={() => setOpenNav(false)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setOpenNav(false);
                }
              }}
              className="w-16 py-4 bg-paper-color shadow-float border-l border-y border-border-color rounded-l-md h-fit justify-between items-center flex flex-col gap-4 absolute right-0 z-20"
            >
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
              <div className="h-0 border border-border-color w-12" />
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
          )}
        </div>
      </nav>
      <main className="px-4 py-16 md:ml-40 md:px-12 md:py-32">
        <Outlet />
      </main>
    </div>
  );
}
