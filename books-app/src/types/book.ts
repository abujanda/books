export interface Book {
    _id: string;
    isbn: string;
    notes?: string;
    rating?: number;
    readDate: Date;
    summary?: string;
    title: string;
    userId: string;
}

export interface BookCreateOptions {
    isbn: string;
    notes?: string;
    readDate: Date;
    rating?: number;
    summary?: string;
    title: string;
    userId: string;
}
export interface BookUpdateOptions {
    id: string;
    isbn: string;
    notes?: string;
    rating?: number;
    readDate?: Date;
    summary?: string;
    title?: string;
}