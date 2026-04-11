import type React from "react";
import { cn } from "~/utils/css";

type Props = Omit<React.ComponentPropsWithoutRef<"img">, "alt"> & {
  alt: string;
};

export default function Image({ className, ...props }: Props) {
  const { alt, ...restProps } = props;
  return (
    <img {...restProps} alt={alt} className={cn("block w-full max-w-[512px] mx-auto", className)} />
  );
}
