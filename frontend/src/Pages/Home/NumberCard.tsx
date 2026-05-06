import type { IconType } from "react-icons";

export default function NumberCard({ title, number, icon }: { title: string; number: number; icon: IconType }) {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg bg-white p-4 shadow-md w-full">
        <div className="flex flex-col gap-2 justify-center items-start">
            <span className="text-2xl font-bold">{title}</span>
            <span className="text-5xl font-bold">{number}</span>
        </div>

        <div className="bg-teal-500/20 rounded-lg p-2">
            {icon({ size: 60, className: "text-teal-600" })}
        </div>
    </div>
  );
}