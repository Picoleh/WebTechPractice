import type { IconType } from "react-icons";

export default function AsideButton({ title, Icon, onClick, isOpen, isActive }: { title: string; Icon: IconType; onClick?: () => void; isOpen: boolean; isActive: boolean }) {
    return (
        <button
      onClick={onClick}
      className={`flex items-center w-full p-2 hover:bg-[var(--primary-color-hover)] rounded transition-colors duration-200 ${isActive ? 'bg-[var(--primary-color-hover)]' : ''} ${isOpen ? 'justify-start' : 'justify-center'}`}>
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