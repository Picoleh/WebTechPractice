export default function ContentCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className={`flex flex-col gap-2 items-start bg-[var(--bg-color)] text-[var(--text-color)] rounded-lg shadow-md p-4 w-full h-full`}>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            {children}
        </div>
    );
}