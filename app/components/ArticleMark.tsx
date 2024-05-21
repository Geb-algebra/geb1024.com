import type { IconComponent } from "./icons/types";

export default function ArticleMark(props: { Icon: IconComponent }) {
  return (
    <div className="m-1 mt-[2px] h-[70px] md:h-[88px] aspect-square rounded-iconic-xl md:rounded-iconic-2xl bg-sub-color ring-2 ring-offset-2 ring-sub-color z-10 flex items-center">
      <props.Icon className="w-12 aspect-square text-base-color mx-auto" type="solid" />
    </div>
  );
}
