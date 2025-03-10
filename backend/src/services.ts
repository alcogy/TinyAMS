import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { getRangeMonthStartEnd } from "./lib";

/**
 * Get View.
 * @param req
 * @param res
 */
export const index = async (req: Request, res: Response) => {
  res.status(200).send({ hello: "world" });
};

/**
 * Execute login.
 * @param req
 * @param res
 */
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

/**
 * Get timecard data at the day.
 * @param req
 * @param res
 */
export const timecard = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const date = new Date(req.query.date as string);

    const prisma = new PrismaClient();
    const att = await prisma.attendance.findFirst({
      where: {
        AND: [{ userId: userId }, { date: date }],
      },
    });

    if (att === null) {
      const created = await prisma.attendance.create({
        data: {
          date: date,
          remark: "",
          userId: userId,
        },
      });
      const data = {
        id: created.id,
        workIn: null,
        workOut: null,
        breakIn: [],
        breakOut: [],
      };
      res.status(200).send({ timecard: data });
    } else {
      const brk = await prisma.break.findMany({
        where: {
          attendanceId: att?.id,
        },
      });
      const data = {
        id: att.id,
        workIn: att.workIn || null,
        workOut: att.workOut || null,
        breakIn: brk.map((v) => v.in),
        breakOut: brk.map((v) => v.out),
      };
      res.status(200).send({ timecard: data });
    }
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

/**
 * Update work in time.
 * @param req
 * @param res
 */
export const workin = async (req: Request, res: Response) => {
  try {
    const id = req.body.attendanceId;
    const prisma = new PrismaClient();

    const data = await prisma.attendance.update({
      data: { workIn: new Date() },
      where: { id: id },
    });

    res.status(200).send({ result: data });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

/**
 * Update work out time.
 * @param req
 * @param res
 */
export const workout = async (req: Request, res: Response) => {
  try {
    const id = req.body.attendanceId;
    const prisma = new PrismaClient();

    const data = await prisma.attendance.update({
      data: { workOut: new Date() },
      where: { id: id },
    });

    res.status(200).send({ result: data });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

/**
 * Registration break in time.
 * @param req
 * @param res
 */
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

/**
 * Registration break out time.
 * @param req
 * @param res
 */
export const breakout = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const prisma = new PrismaClient();
    const result = await prisma.break.update({
      data: { out: new Date() },
      where: { id: body.id },
    });
    res.status(200).send({ result: result });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

/**
 * Fetch All users.
 * @param req
 * @param res
 */
export const fetchUsers = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  res.status(200).send({ users: users });
};

/**
 * Create a new user.
 * @param req
 * @param res
 */
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

/**
 * Update user info.
 * @param req
 * @param res
 */
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

/**
 * Delete user.
 * @param req
 * @param res
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const prisma = new PrismaClient();
    await prisma.user.delete({ where: { id: req.body.id } });
    res.status(200).send({ message: "ok" });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

/**
 * Attendance list by target user.
 * @param req
 * @param res
 */
export const listByUser = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId as string;
    const prisma = new PrismaClient();
    const [from, end] = getRangeMonthStartEnd(
      req.query.date ? new Date(req.query.date as string) : new Date()
    );

    let data = await prisma.attendance.findMany({
      where: {
        userId: userID,
        date: {
          gte: from,
          lt: end,
        },
      },
    });

    if (data.length === 0) {
      const endDate = end.getDate();
      const initdata = [];
      for (let i = 1; 1 <= endDate; i++) {
        initdata.push({
          date: new Date(),
          remark: "",
          userId: userID,
        });
      }
      await prisma.attendance.createMany({ data: initdata });
    }
    res.status(200).send({ data: data });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

/**
 * Attendance list by target user.
 * @param req
 * @param res
 */
export const detail = async (req: Request, res: Response) => {
  try {
    // TODO return user and attendance in target month.
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { id: req.params.userId },
    });
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send({ message: e });
  }
};
