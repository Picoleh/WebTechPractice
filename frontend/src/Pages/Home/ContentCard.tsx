export default function ContentCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className={`flex flex-col gap-2 items-start bg-white rounded-lg shadow-md p-4 w-full h-full`}>
            <h2 className="text-2xl font-bold">{title}</h2>
            {children}
        </div>
    );
}