import * as RadixSwitch from "@radix-ui/react-switch";
import { cn } from "~/utils/css";
import { ringOnFocusVisible } from "./styles";

// toggle switch component
export default function Switch(props: {
  actionName: string;
  state: boolean;
  id: string;
  onSwitch: (state: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <RadixSwitch.Root
        checked={props.state}
        onCheckedChange={props.onSwitch}
        id={props.id}
        className={cn(
          "w-9 h-6 rounded-iconic-md flex justify-center items-center px-1 py-1 bg-sub-color data-[state=checked]:bg-geb-blue",
          ringOnFocusVisible,
        )}
      >
        <RadixSwitch.Thumb className="w-5 h-6 border-2 rounded-iconic-md transform transition-transform duration-300 ease-in-out bg-paper-color border-sub-color -translate-x-2 data-[state=checked]:border-geb-blue data-[state=checked]:translate-x-2" />
      </RadixSwitch.Root>
      <label htmlFor={props.id} className="cursor-pointer">
        {props.actionName}
      </label>
    </div>
  );
}
