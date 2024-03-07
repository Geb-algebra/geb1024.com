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
          <div className="w-12 h-8 bg-sub-color rounded-iconic-lg flex justify-center items-center px-1 py-1">
            <div
              className={`w-6 h-6 rounded-iconic-md transform transition-transform duration-300 ease-in-out ${
                props.state ? 'bg-geb-blue translate-x-2' : 'bg-base-color -translate-x-2'
              }`}
            />
          </div>
        </div>
        <div className="ml-3 text-gray-700 font-medium">{props.actionName}</div>
      </label>
    </div>
  );
}
