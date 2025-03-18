import { Request, Response } from "express";
import { Attendance, PrismaClient, User } from "@prisma/client";
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
        breakIn: null,
        breakOut: null,
      };
      res.status(200).send({ timecard: data });
    } else {
      res.status(200).send({ timecard: att });
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
    const id = req.body.attendanceId;
    const prisma = new PrismaClient();

    const data = await prisma.attendance.update({
      data: { breakIn: new Date() },
      where: { id: id },
    });
    res.status(200).send({ result: data });
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
    const id = req.body.attendanceId;
    const prisma = new PrismaClient();

    const data = await prisma.attendance.update({
      data: { breakOut: new Date() },
      where: { id: id },
    });
    res.status(200).send({ result: data });
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
    const user = req.body.user;
    const prisma = new PrismaClient();
    const [from, end] = getRangeMonthStartEnd(new Date(req.params.date));

    let data = await prisma.attendance.findMany({
      where: {
        userId: user.id,
        date: {
          gte: from,
          lt: end,
        },
      },
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

export const detailUpdate = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const prisma = new PrismaClient();
    const data = req.body.data as Attendance;
    const result = await prisma.attendance.upsert({
      where: { id: data.id },
      update: {
        workIn: data.workIn,
        workOut: data.workOut,
        breakIn: data.breakIn,
        breakOut: data.breakOut,
        remark: data.remark,
      },
      create: {
        date: data.date,
        workIn: data.workIn,
        workOut: data.workOut,
        breakIn: data.breakIn,
        breakOut: data.breakOut,
        userId: user.id,
        remark: data.remark,
      },
    });
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send({ message: e });
  }
};
