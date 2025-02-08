import { Slot } from "@radix-ui/react-slot";
import { HomeIcon, MenuIcon, NotebookPenIcon, PuzzleIcon, User2Icon } from "lucide-react";
import type { MetaFunction } from "react-router";
import { Link, NavLink, Outlet } from "react-router";
import GebMoon from "~/components/GebMoon";
import GitHub from "~/components/logos/GitHub";
import X from "~/components/logos/X";
import Zenn from "~/components/logos/Zenn";
import { floating, ringOnFocusVisible } from "~/components/styles";
import { cn } from "~/utils/css";

import styles from "./_main.module.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Geb's Lab" },
    {
      name: "description",
      content: "An engineer's knowledges about tech, communication, team building, etc.",
    },
  ];
};

function NavLinkIcon(props: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }: { isActive: boolean }) =>
        cn(
          "rounded-iconic-md w-10 h-10 md:rounded-iconic-xl md:w-16 md:h-16",
          floating.hover,
          floating.focusVisible,
          ringOnFocusVisible,
          isActive ? floating.always : "",
        )
      }
    >
      <Slot className="w-6 md:w-10 h-full m-auto text-geb-blue">{props.children}</Slot>
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
        "rounded-iconic-md w-10 h-10 md:rounded-iconic-xl md:w-16 md:h-16",
        floating.hover,
        floating.focusVisible,
        ringOnFocusVisible,
      )}
    >
      <Slot className="w-6 md:w-10 h-full m-auto text-geb-blue">{props.children}</Slot>
    </a>
  );
}

export default function Index() {
  return (
    <div className={cn("bg-base-color w-full h-screen", styles["body-layout"])}>
      <Link
        to="/articles"
        prefetch="viewport"
        className={cn(
          "block w-16 h-16 rounded-iconic-xl m-2 pl-0.5 pt-0.5 bg-geb-blue ring-1 ring-offset-1 ring-geb-blue hover:bg-geb-blue",
          "md:w-32 md:h-32 md:rounded-iconic-3xl md:ring-2 md:ring-offset-2",
          styles.logo,
        )}
      >
        <GebMoon color="#02ac8e" />
      </Link>
      <h1 className={cn("text-2xl font-bold text-geb-blue text-center", styles.name)}>Geb's Lab</h1>
      <nav className={cn(styles.nav, "w-full md:w-auto backdrop-blur-md")}>
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
        <div />
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
      <main className={cn(styles["main-layout"], "px-4 py-16 md:px-12 md:py-32")}>
        <div className="max-w-4xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
