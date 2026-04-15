export async function deleteBiomaterial(id: number) {
  const response = await fetch(`http://localhost:8000/biomaterials/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar biomaterial");
  }

  return response.json();
}