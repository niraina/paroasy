
export type CarouselModel = {
    data: CarouselInterface[];
    success: boolean;
}

export type CarouselInterface = {
    id: number;
    title: string;
    rank: number;
    path: string
}