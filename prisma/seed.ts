import { db } from "../src/utils/db.server";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890", 10);
const id = nanoid();

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
};

async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          id: Number(id),
          firstName: author.firstName,
          lastName: author.lastName,
        },
      });
    })
  );
  const author = await db.author.findFirst({
    where: {
      firstName: "John",
    },
  });

  await Promise.all(
    getBooks().map((book) => {
      const { title, isFiction, datePublished } = book;
      return db.book.create({
        data: {
          id: Number(id),
          title,
          isFiction,
          datePublished,
          authorId: author?.id ?? 0,
        },
      });
    })
  );
}

seed();

function getAuthors(): Array<Author> {
  return [
    {
      firstName: "John",
      lastName: "Doe",
    },
    {
      firstName: "William",
      lastName: "Deffoe",
    },
    {
      firstName: "Keanu",
      lastName: "Reeves",
    },
  ];
}

function getBooks(): Array<Book> {
  return [
    {
      title: "The Matrix",
      isFiction: true,
      datePublished: new Date(),
    },
    {
      title: "Game of Thrones",
      isFiction: true,
      datePublished: new Date(),
    },
    {
      title: "The Hobbit",
      isFiction: true,
      datePublished: new Date(),
    },
  ];
}
