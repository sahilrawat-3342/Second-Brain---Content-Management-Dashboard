import { ReactElement } from "react"

export function SidebarItem({
  text,
  Icon,
  onClick,
}: {
  text: string,
  Icon: ReactElement,
  onClick: () => void;
}) {
  return (
    <div
      className="flex items-center text-gray-700 py-2 cursor-pointer hover:bg-gray-100 rounded-md mr-4 transition-all duration-150"
      onClick={onClick}
    >
      <div className="pl-4 pr-6">{Icon}</div>
      <div>{text}</div>
    </div>
  );
}
