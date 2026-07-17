export interface Reference {
    name: string;
    url: string;
    username?: string;
    password?: string;
}

export interface Requirement {
    id: string;
    title: string;
    routePath: string;
    tags: string[];
    status: 'todo' | 'doing' | 'done';
    date: string;          // ISO 8601 格式，如 "2026-06-18"
    isUrgent: boolean;
    assignee?: string;
    flowchartUrl?: string;
    checklistUrl?: string;
    htmlText: string;
}

export interface Project {
    id: string;
    name: string;
    tags: string[];
    description: string;
    references: Reference[];
    requirements: Requirement[];
}
