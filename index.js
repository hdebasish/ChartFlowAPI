import "./env.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./src/features/user/user.routes.js";
import dashboardRouter from "./src/features/dashboard/dashboard.routes.js"
import jwtAuth from "./src/middleware/jwt.middleware.js";

const app = express();

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true, 
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(cookieParser());

app.use("/api/users", userRouter);

app.use("/api/dashboard", jwtAuth, dashboardRouter);

app.use((err, req, res, next) => {
  console.log(err);

  if (err) {
    res.status(500).send("Fatal error, Please try later");
  }
});

app.use((req, res) => {
  res.status(404).send("404 Not Found!");
});

export default app;