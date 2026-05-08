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
    img_path?: string;
    image?: File;
};

export const EmptyBiomaterial = (): Biomaterial => ({
    id: 0,
    name: "",
    type_id: 0,
    description: "",
    density: 0,
    biocompatibility: "High",
    created_at: null,
    img_path: undefined,
    image: undefined,
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

export type StudyType = {
    id: number;
    name: string;
    description: string;
    level_evidence: string;
    created_at: string | null;
}

export const EmptyStudyType = (): StudyType => ({
    id: 0,
    name: "",
    description: "",
    level_evidence: "High",
    created_at: null,
});

export type ResearchTech = {
    id: number;
    name: string;
    description: string;
    cost_level: string;
    created_at: string | null;
}

export const EmptyResearchTech = (): ResearchTech => ({
    id: 0,
    name: "",
    description: "",
    cost_level: "High",
    created_at: null,
});

export type Experiment = {
    id: number;
    title: string;
    objective: string;
    description: string;
    start_date: string | null;
    end_date: string | null;
    status: string;
    biomaterial_id: number;
    study_type_id: number;
    research_tech_ids: number[];
    results: string;
    created_at: string | null;
}

export const EmptyExperiment = (): Experiment => ({
    id: 0,
    title: "",
    objective: "",
    description: "",
    start_date: null,
    end_date: null,
    status: "Pending",
    biomaterial_id: 0,
    study_type_id: 0,
    research_tech_ids: [],
    results: "",
    created_at: null,
});

export type ProjectSearchResultType = {
    entity_type: string;
    title: string;
    content: string;
};