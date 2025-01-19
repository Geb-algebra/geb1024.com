import { Slot } from "@radix-ui/react-slot";
import { HomeIcon, MenuIcon, NotebookPenIcon, PuzzleIcon, User2Icon } from "lucide-react";
import { useState } from "react";
import type { MetaFunction } from "react-router";
import { Link, NavLink, Outlet } from "react-router";
import GebMoon from "~/components/GebMoon";
import GitHub from "~/components/logos/GitHub";
import X from "~/components/logos/X";
import Zenn from "~/components/logos/Zenn";
import { floating, ringOnFocusVisible } from "~/components/styles";
import { cn } from "~/utils/css";

export const meta: MetaFunction = () => {
  return [
    { title: "Geb's Lab" },
    {
      name: "description",
      content: "An engineer's knowledges about tech, communication, team building, etc.",
    },
  ];
};

function NavLinkIcon({
  small = false,
  ...props
}: { to: string; children: React.ReactNode; small?: boolean }) {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }: { isActive: boolean }) =>
        cn(
          small ? "rounded-iconic-md w-10 h-10" : "rounded-iconic-xl w-16 h-16",
          floating.hover,
          floating.focusVisible,
          ringOnFocusVisible,
          isActive ? floating.always : "",
        )
      }
    >
      <Slot className={cn(small ? "w-6" : "w-10", "h-full m-auto text-geb-blue")}>
        {props.children}
      </Slot>
    </NavLink>
  );
}

function ExternalServiceIcon({
  small = false,
  ...props
}: { href: string; children: React.ReactNode; small?: boolean }) {
  return (
    <a
      href={props.href}
      className={cn(
        small ? "rounded-iconic-md w-10 h-10" : "rounded-iconic-xl w-16 h-16",
        floating.hover,
        floating.focusVisible,
        ringOnFocusVisible,
      )}
    >
      <Slot className={cn(small ? "w-6" : "w-10", "h-full m-auto text-geb-blue")}>
        {props.children}
      </Slot>
    </a>
  );
}

export default function Index() {
  return (
    <div className="bg-base-color w-full h-screen">
      <div className="hidden md:block w-42 pl-2 pt-2 fixed">
        <Link
          to="/articles"
          prefetch="viewport"
          className="block w-32 h-32 rounded-iconic-3xl m-1 pl-0.5 pt-0.5 bg-geb-blue ring-2 ring-offset-2 ring-geb-blue hover:bg-geb-blue"
        >
          <GebMoon color="#02ac8e" />
        </Link>
        <h1 className="text-2xl font-bold text-geb-blue my-6 text-center">Geb's Lab</h1>
        <nav className="w-32 mt-8 mx-1 h-fit flex flex-col items-center gap-1">
          <NavLinkIcon to="/">
            <HomeIcon />
          </NavLinkIcon>
          <NavLinkIcon to="/about">
            <User2Icon />
          </NavLinkIcon>
          <NavLinkIcon to="/articles">
            <NotebookPenIcon />
          </NavLinkIcon>
          <NavLinkIcon to="/knowledge-pieces">
            <PuzzleIcon />
          </NavLinkIcon>
          <div className="h-0 border border-border-color w-12 my-6" />
          <ExternalServiceIcon href="https://github.com/Geb-algebra">
            <GitHub color="black" />
          </ExternalServiceIcon>
          <ExternalServiceIcon href="https://x.com/GebAlgebra">
            <X color="black" />
          </ExternalServiceIcon>
          <ExternalServiceIcon href="https://zenn.dev/geb">
            <Zenn color="black" />
          </ExternalServiceIcon>
        </nav>
      </div>
      <div className="md:hidden">
        <div className="flex m-2">
          <Link
            to="/articles"
            prefetch="viewport"
            className="block w-16 h-16 rounded-iconic-xl pl-0.5 pt-0.5 bg-geb-blue ring-1 ring-offset-1 ring-geb-blue"
          >
            <GebMoon color="#02ac8e" />
          </Link>
          <h1 className="text-2xl font-bold text-geb-blue mx-4 my-auto">Geb's Lab</h1>
        </div>
        <nav className="p-2 fixed bottom-0 flex items-center justify-center w-full backdrop-blur-lg">
          <NavLinkIcon small to="/">
            <HomeIcon />
          </NavLinkIcon>
          <NavLinkIcon small to="/about">
            <User2Icon />
          </NavLinkIcon>
          <NavLinkIcon small to="/articles">
            <NotebookPenIcon />
          </NavLinkIcon>
          <NavLinkIcon small to="/knowledge-pieces">
            <PuzzleIcon />
          </NavLinkIcon>
          <div className="w-0 border border-border-color h-10 mx-4" />
          <ExternalServiceIcon small href="https://github.com/Geb-algebra">
            <GitHub color="black" />
          </ExternalServiceIcon>
          <ExternalServiceIcon small href="https://x.com/GebAlgebra">
            <X color="black" />
          </ExternalServiceIcon>
          <ExternalServiceIcon small href="https://zenn.dev/geb">
            <Zenn color="black" />
          </ExternalServiceIcon>
        </nav>
      </div>
      <main className="px-4 py-16 md:ml-40 md:px-12 md:py-32">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
