import { db } from "../utils/db.server";
import type { Author } from "../author/author.service";

type BookRead = {
  id: string;
  title: string;
  datePublished: Date;
  isFiction: boolean;
  author: Author;
  // authorId: string;
};

type BookCreate = {
  title: string;
  datePublished: Date;
  isFiction: boolean;
  authorId: string;
};

export const listBooks = async (): Promise<BookRead[]> => {
  return db.book.findMany({
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const getBook = async (id: string): Promise<BookRead | null> => {
  return db.book.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const createBook = async (book: BookCreate): Promise<BookRead> => {
  const { title, authorId, datePublished, isFiction } = book;
  const parseDate: Date = new Date(datePublished);

  return db.book.create({
    data: {
      title,
      authorId,
      isFiction,
      datePublished: parseDate,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const updateBook = async (
  book: BookCreate,
  id: string
): Promise<BookRead | null> => {
  const { title, authorId, datePublished, isFiction } = book;
  return db.book.update({
    where: {
      id,
    },
    data: {
      title,
      isFiction,
      datePublished,
      authorId,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const deleteBook = async (id: string): Promise<BookRead | null> => {
  return db.book.delete({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};
