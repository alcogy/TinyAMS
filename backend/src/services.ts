import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";

export const index = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      password: true,
    },
  });
  res.status(200).send({ users: users });
};

export const login = async (req: Request, res: Response) => {
  try {
    const jwt_secret_key = process.env.JWT_SECRET_KEY;
    if (jwt_secret_key === undefined) {
      throw "JWT SECRET KEY not found";
    }

    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: {
        id: req.body.id,
        password: req.body.password,
      },
    });

    if (user === null) {
      throw "account not found";
    }
    // Generate Token
    const token = sign({ user: user }, jwt_secret_key);
    res.status(200).send({ token: token, user: user });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const timecard = async (req: Request, res: Response) => {
  res.status(200).send({ message: "ok" });
};

export const workin = async (req: Request, res: Response) => {
  res.status(200).send({ message: "ok" });
};

export const workout = async (req: Request, res: Response) => {
  res.status(200).send({ message: "ok" });
};

export const breakin = async (req: Request, res: Response) => {
  res.status(200).send({ message: "ok" });
};

export const breakout = async (req: Request, res: Response) => {
  res.status(200).send({ message: "ok" });
};

export const fetchUsers = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  res.status(200).send({ message: users });
};

export const postUser = async (req: Request, res: Response) => {
  res.status(200).send({ message: "ok" });
};

export const putUser = async (req: Request, res: Response) => {
  res.status(200).send({ message: "ok" });
};

export const deleteUser = async (req: Request, res: Response) => {
  res.status(200).send({ message: "ok" });
};
