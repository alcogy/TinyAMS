import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { getRangeMonthStartEnd } from "./lib";

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
    const user = await prisma.user.findFirst({
      where: {
        AND: [{ id: req.body.id }, { password: req.body.password }],
      },
    });

    if (user === null) {
      throw "account not found";
    }
    // Generate Token
    const token = sign({ user: user }, jwt_secret_key);
    res.status(200).send({ token: token, user: user });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

export const timecard = async (req: Request, res: Response) => {
  try {
    const userID = req.body.userId;
    const prisma = new PrismaClient();
    // 初期化判定
    const [from, end] = getRangeMonthStartEnd(req.body.date);

    let data = await prisma.attendance.findMany({
      where: {
        userID: userID,
        date: {
          gte: from,
          lt: end,
        },
      },
    });
    if (data.length === 0) {
      // 初期化
      const endDate = end.getDate();
      const initdata = [];
      for (let i = 1; 1 <= endDate; i++) {
        initdata.push({
          date: new Date(),
          remark: "",
          userID: Number(userID),
        });
      }
      await prisma.attendance.createMany({ data: initdata });
    }
    res.status(200).send({ data: data });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const workin = async (req: Request, res: Response) => {
  res.status(200).send({ message: "ok" });
};

export const workout = async (req: Request, res: Response) => {
  res.status(200).send({ message: "ok" });
};

export const breakin = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const prisma = new PrismaClient();
    const data = {
      attendanceId: body.attendanceId,
      in: new Date(),
    };
    const result = await prisma.break.create({ data: data });
    res.status(200).send({ result: result });
  } catch (e) {
    res.status(500).send({ message: e });
  }
  res.status(200).send({ message: "ok" });
};

export const breakout = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const prisma = new PrismaClient();
    await prisma.break.update({
      data: { out: new Date() },
      where: { id: body.id },
    });
    res.status(200).send({ message: "ok" });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

export const fetchUsers = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  res.status(200).send({ users: users });
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const prisma = new PrismaClient();
    const user = {
      id: body.id,
      name: body.name,
      password: body.password,
      active: true,
    };
    await prisma.user.create({ data: user });
    res.status(200).send({ message: "ok" });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

export const putUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const prisma = new PrismaClient();
    const user = {
      name: body.name,
      password: body.password,
      active: body.active,
    };
    await prisma.user.update({ data: user, where: { id: body.id } });
    res.status(200).send({ message: "ok" });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const prisma = new PrismaClient();
    await prisma.user.delete({ where: { id: req.body.id } });
    res.status(200).send({ message: "ok" });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

export const detail = async (req: Request, res: Response) => {
  try {
    // TODO return user and attendance in target month.
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { id: req.params.userID },
    });
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send({ message: e });
  }
};
