import { fetchData } from "../../DataManagement/DataManager";
import type { Biomaterial } from "../../DataManagement/DataTypes";

export async function deleteBiomaterial(bioMat: Biomaterial) {
  try{
    const json = await fetchData(`biomaterials/${bioMat.id}`, "DELETE");
    return json;
  }
  catch (err) {
    throw new Error("Erro ao deletar biomaterial");
  }
}