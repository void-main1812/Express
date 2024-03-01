import { customAlphabet } from "nanoid";
import { db } from "../src/utils/db.server";

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
          id: customAlphabet("1234567890abcdef", 24)(),
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
          id: customAlphabet("1234567890abcdef", 24)(),
          title,
          isFiction,
          datePublished,
          authorId: author!.id || "",
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
