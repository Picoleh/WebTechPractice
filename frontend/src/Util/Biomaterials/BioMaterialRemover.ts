import { fetchData } from "../../DataManagement/DataManager";

export async function deleteBiomaterial(id: number) {
  try{
    const json = await fetchData(`biomaterials/${id}`, "DELETE");
    return json;
  }
  catch (err) {
    throw new Error("Erro ao deletar biomaterial");
  }
}