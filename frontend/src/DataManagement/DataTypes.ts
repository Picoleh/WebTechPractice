export type BiomaterialType = {
    id: number;
    name: string;
    description: string;
    created_at: string | null;
};

export type Biomaterial = {
    id: number;
    name: string;
    type_id: number;
    description: string;
    density: number | null;
    biocompatibility: string;
    created_at: string | null;
};

export const EmptyBiomaterial = (): Biomaterial => ({
    id: 0,
    name: "",
    type_id: 0,
    description: "",
    density: 0,
    biocompatibility: "",
    created_at: null,
});