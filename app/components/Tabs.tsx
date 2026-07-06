import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils/css";

export function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("group/tabs grid gap-5 data-[orientation=horizontal]:grid-cols-1", className)}
      orientation={orientation}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center gap-2 rounded-iconic-xl border border-border-color bg-base-color p-1 text-text-sub inset-shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        line: "rounded-none border-x-0 border-t-0 bg-transparent p-0 shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex min-w-28 items-center justify-center gap-2 rounded-iconic-lg border border-transparent px-4 py-2 text-sm font-bold text-text-sub transition-all duration-300 outline-none",
        "hover:bg-paper-color hover:text-text-main focus-visible:bg-paper-color focus-visible:text-text-main",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sub-color",
        "data-[active]:border-sub-color/70 data-[active]:bg-paper-color data-[active]:text-text-main data-[active]:shadow-float",
        "group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:border-0 group-data-[variant=line]/tabs-list:px-2",
        "group-data-[variant=line]/tabs-list:data-[active]:border-b-2 group-data-[variant=line]/tabs-list:data-[active]:border-geb-blue group-data-[variant=line]/tabs-list:data-[active]:bg-transparent group-data-[variant=line]/tabs-list:data-[active]:shadow-none",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  keepMounted = false,
  ...props
}: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      keepMounted={keepMounted}
      className={cn("outline-none", className)}
      {...props}
    />
  );
}
