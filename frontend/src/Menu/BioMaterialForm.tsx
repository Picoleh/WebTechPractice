import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import type {Biomaterial} from "./SearchComponent";
import { useState } from "react";

export default function BioMaterialForm() {
    const {id} = useParams();
    const location = useLocation();

    const bioMatFromState = location.state?.biomaterial;

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState<Biomaterial>({
        id: bioMatFromState?.id ?? 0,
        name: bioMatFromState?.name ?? "",
        type: bioMatFromState?.type ?? "",
        description: bioMatFromState?.description ?? "",
        density: bioMatFromState?.density ?? null,
        biocompatibility: bioMatFromState?.biocompatibility ?? "",
        created_at: bioMatFromState?.created_at ?? null,
    });

    const navigate = useNavigate();

    async function Add() {
        console.log("Adding biomaterial:", formData);
        try {
            const response = await fetch("http://localhost:8000/biomaterials", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                console.log(`Post failed with status ${response.status}`);
            }

            const data =await response.json();
            console.log("Biomaterial added:", data);
        }
        catch (err) {
            console.error("Unknown error while fetching data");
        }

        navigate("/");
    }
    
    async function Update() {
        console.log("Updating biomaterial:", formData);
        try {
            const response = await fetch(`http://localhost:8000/biomaterials/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                console.log(`Update failed with status ${response.status}`);
            }
            const data = await response.json();
            console.log("Biomaterial updated:", data);
        }
        catch (err) {
            console.error("Unknown error while fetching data");
        }

        navigate("/");
    }

        return (
             <div className="bg-gray-200 w-full p-6">
                <Link to="/">
                    <button className="mb-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Voltar
                    </button>
                </Link>
                <form>
                    <div className="flex flex-row gap-4 mb-4">
                        <div className="w-full">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                             type="text"
                             placeholder="Insert biomaterial name"
                             value={formData.name}
                             onChange={(e) => setFormData({...formData, name: e.target.value})}
                             className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                             />
                        </div>
                        <div className="w-2/12">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                Type
                            </label>
                            <input
                             type="text"
                             placeholder="Type"
                             value={formData.type}
                             onChange={(e) => setFormData({...formData, type: e.target.value})}
                             className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                             />
                        </div>
                        <div className="w-3/12">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="density">
                                Density
                            </label>
                            <input
                             type="number"
                             placeholder="Density"
                             value={formData.density ?? ""}
                             onChange={(e) => setFormData({...formData, density: e.target.value ? Number(e.target.value) : null})}
                             className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                             />
                        </div>
                        <div className="w-6/12">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="biocompatibility">
                                Biocompatibility
                            </label>
                            <input
                             type="text"
                             placeholder="Biocompatibility"
                             value={formData.biocompatibility}
                             onChange={(e) => setFormData({...formData, biocompatibility: e.target.value})}
                             className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                             />
                        </div>
                    </div>
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                         placeholder="Description"
                         value={formData.description}
                         onChange={(e) => setFormData({...formData, description: e.target.value})}
                         className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex flex-row gap-4 items-baseline justify-end">
                        {/* <button type="reset" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
                            Reset
                        </button> */}
                        <button type="button" onClick={isEditMode ? Update : Add} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            {isEditMode ? "Update" : "Add Biomaterial"}
                        </button>
                    </div>
                </form>
             </div>
        );
}