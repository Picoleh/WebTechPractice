import type { IconType } from "react-icons";

export default function AsideButton({ title, Icon, onClick, isOpen }: { title: string; Icon: IconType; onClick?: () => void; isOpen: boolean }) {
    return (
        <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-2 hover:bg-teal-700 rounded transition-colors duration-200 ${isOpen ? 'justify-start' : 'justify-center'}`}>
        <Icon size={24} />
        { isOpen && <span
        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
          isOpen ? "opacity-100 w-auto ml-3" : "opacity-0 w-0 ml-0"
        }`}
      >
        {title}
      </span>}
    </button>
    );
}