// toggle switch component
export default function Switch(props: {
  actionName: string;
  state: boolean;
  onSwitch: (state: boolean) => void;
  className?: string;
}) {
  return (
    <div className={`flex items-center ${props.className}`}>
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="hidden"
            checked={props.state}
            onChange={(e) => props.onSwitch(e.target.checked)}
          />
          <div
            className={`w-9 h-6 rounded-iconic-md flex justify-center items-center px-1 py-1 ${
              props.state ? "bg-geb-blue" : "bg-sub-color"
            }`}
          >
            <div
              className={`w-5 h-6 border-2 border-sub-color rounded-iconic-md transform transition-transform duration-300 ease-in-out bg-paper-color ${
                props.state ? "border-geb-blue translate-x-2" : "border-sub-color -translate-x-2"
              }`}
            />
          </div>
        </div>
        <div className="ml-3 text-gray-700 font-medium">{props.actionName}</div>
      </label>
    </div>
  );
}
