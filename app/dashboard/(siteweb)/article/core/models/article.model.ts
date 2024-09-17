
export type ArticleModel = {
    data:       Article[];
    success: boolean;
    totalItems?: number;
    page: number;
    itemsPerPage: number;
    totalPages?: number;
    currentPage: number;
}

export type Article = {
    id: number;
    title: string;
    content: string;
    isPublic: boolean;
    tumbnail: string;
}

export type RequestArticle = {
    page: number;
    itemsPerPage: number;
    title?: string;
};