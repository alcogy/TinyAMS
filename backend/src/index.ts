import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import * as services from "./services";
import { verify } from "jsonwebtoken";

const app = express();

dotenv.config();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Authorization middleware;
const verification = (req: Request, res: Response, next: Function) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.indexOf("Bearer ") === -1
  ) {
    res.status(401).send("none auth token");
    return;
  }

  const token = req.headers.authorization.split(" ")[1];
  const key = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : "";
  verify(token, key, (err, decoded) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    req.body.user = (decoded as any)["user"];
    next();
  });
};

// Routing
app.get("/", services.index);
app.post("/login", services.login);
app.get("/timecard", services.timecard);
app.post("/timecard/workin", services.workin);
app.post("/timecard/workout", services.workout);
app.post("/timecard/breakin", services.breakin);
app.post("/timecard/breakout", services.breakout);
app.get("/users", services.fetchUsers);
app.post("/user", services.postUser);
app.put("/user", services.putUser);
app.delete("/user", services.deleteUser);
app.get("/detail/:userID", services.detail);

app
  .listen(8000, () => {
    console.log("Server running at PORT: ", 8000);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
