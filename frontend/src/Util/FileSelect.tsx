import { useState } from "react";

export default function FileSelect({ onFileSelect, accept }: { onFileSelect: (file: File) => void; accept: string }) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    return (
        <div className="w-full">
            <div>
                <label htmlFor="file-input" className="bg-teal-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-teal-700">
                    {selectedFile ? selectedFile.name : "Select File"}
                </label>
            </div>
            <input id="file-input" className="hidden" type="file" accept={accept} onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                    onFileSelect(file);
                    setSelectedFile(file);
                }
            }} />
        </div>
    );

}