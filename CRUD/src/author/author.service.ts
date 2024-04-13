import { customAlphabet } from "nanoid";
import { db } from "../utils/db.server";
import { Prisma } from "@prisma/client";

// Author type definition with id, firstName, lastName, and createdAt fields
export type Author = {
  id?: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
};

export const listAuthors = async (): Promise<Author[]> => {
  // db = prisma client, author = table name, findMany = select * from author
  return db.author.findMany({
    // select only id, firstName, lastName, and createdAt fields from author table actual mogno query will be like db.author.find({}, {id: 1, firstName: 1, lastName: 1, createdAt: 1})
    select: {
      id: true,
      firstName: true,
      lastName: true,
      createdAt: true,
    },
  });
};

export const getAuthor = async (id: string): Promise<Author | null> => {
  // db = prisma client, author = table name, findUnique = select * from author where id = id
  return db.author.findUnique({
    // find author where id = id
    where: {
      id,
    },
    // select the fields from author table to show in response
    select: {
      id: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const createAuthor = async (
  author: Omit<Author, "id">
): Promise<Author> => {
  const { firstName, lastName } = author;
  return db.author.create({
    data: {
      firstName,
      lastName,
    } as Prisma.AuthorCreateInput,
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

export const updateAuthor = async (
  author: Omit<Author, "id">,
  id: string
): Promise<Author> => {
  const { firstName, lastName } = author;
  return db.author.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
};

export const deleteAuthor = async (id: string): Promise<void> => {
  await db.author.delete({
    where: {
      id,
    },
  });
};
