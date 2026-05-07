export default function MaterialCard({ title, number, img_path }: { title: string; number: number; img_path: string }) {
    return (
        <div className="flex flex-row shadow border border-gray-400/25 rounded-lg p-2 items-center flex-1">
            <img src={img_path === null ? "/biomaterial.jpg" : img_path} alt={title} className="w-24 h-16 object-cover  rounded mr-4" />
            <div className="flex flex-col gap-0 justify-start items-start">
                <span className="font-bold">{title}</span>
                <span className="text-sm">{number} usos</span>
            </div>
        </div>
    );
}