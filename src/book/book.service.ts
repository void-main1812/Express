import { db } from "../utils/db.server";

type BookRead = {
    id: string;
    title: string;
    datePublished: Date;
    isFiction: boolean;
    authorId: string;
}

export const listBooks = async(): Promise<BookRead[]> => {
    return db.book.findMany({
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            authorId: true
        }
    })
};