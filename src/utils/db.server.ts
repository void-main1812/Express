// Defining the prism client
import { PrismaClient } from "@prisma/client";

// Defining the db variable to be used in the application to access the database client instance of type PrismaClient
let db: PrismaClient;

// Defining the global variable to store the database client instance
declare global {
  var __db: PrismaClient | undefined;
}

// Checking if the global variable is not defined, then create a new instance of PrismaClient and assign it to the global variable
if (!global.__db) {
  global.__db = new PrismaClient();
}

// Assigning the global variable to the db variable
db = global.__db;

export { db };
