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
    biocompatibility: "High",
    created_at: null,
});

export type FilterDropdownProps<T> = {
    filterByTitle: string;
    data: T[];
    onTypeChange: (type: T) => void;
    getLabel: (option: T) => string;
};


export type Column<T> = {
    key: keyof T;
    label: string;
};

export type TableProps<T> = {
    data: T[];
    columns: Column<T>[];
    onDeleteClick: (item: T) => Promise<void> | void;
    onEditClick: (item: T) => void;
};

export type TableValuesProps<T> = {
    data: T[];
    columns: Column<T>[];
}