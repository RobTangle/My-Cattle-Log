const morgan = require("morgan");
import express from "express";
import cors from "cors";

import testRouter from "./routes/test";
import animalRouter from "./routes/animal/animal-routes";
import userRouter from "./routes/user/user-routes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/test", testRouter);
app.use("/animal", animalRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  return res.send("HOLA!!!!!!! AA!!");
});

module.exports = app;
//! este archivo está siendo importado en index.ts de la raíz
