import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  res.status(200).send({ users: users });
});

app
  .listen(8000, () => {
    console.log("Server running at PORT: ", 8000);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
