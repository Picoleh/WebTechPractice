import type { IconType } from "react-icons";

export default function SettingsCard({ title, icon,children }: { title: string, icon: IconType, children: React.ReactNode }) {
    return (
        <div className="flex flex-col bg-[var(--bg-color)] p-8 gap-8 rounded-lg shadow-md">
            <div className="flex flex-row w-full items-center gap-4 text-[var(--text-color)]">
                {icon({ size: 32 })}
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}