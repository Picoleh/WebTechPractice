import type { BiomaterialType } from "../../../DataManagement/DataTypes";

type BioMatTypesFormProps = {
    formData: BiomaterialType;
    setFormData: React.Dispatch<React.SetStateAction<BiomaterialType>>;
};

export default function BioMatTypesForm({formData, setFormData}: BioMatTypesFormProps) {
    return (
        <>
            <label className="font-bold">Name:</label>
            <input type="text" value={formData?.name ?? ""} onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))} className="w-full p-2 rounded border border-gray-400"/>

            <label className="font-bold">Description:</label>
            <textarea value={formData?.description ?? ""} onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))} className="w-full p-2 rounded border border-gray-400"/>
        </>
    );
}