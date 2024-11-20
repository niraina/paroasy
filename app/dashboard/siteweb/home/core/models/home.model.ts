
export type HomeModel = {
    data:       Home[];
    success: boolean;
    totalItems?: number;
    page: number;
    itemsPerPage: number;
    totalPages?: number;
    currentPage: number;
}

export type Home = {
    id: number;
    title: string;
    content: string;
    isPublic: boolean;
    tumbnail: string;
    page?:number;
    type?: string;
}

export type RequestHome = {
    page: number;
    itemsPerPage: number;
    title?: string;
    pageNumber?: number;
};

export type InterfaceHome = {
    id: number;
    title: string;
    content: string;
    isPublic: boolean;
    tumbnail: string;
    page?:number;
    type?: string;
}