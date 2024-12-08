import "./env.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./src/features/user/user.routes.js";
import dashboardRouter from "./src/features/dashboard/dashboard.routes.js"
import jwtAuth from "./src/middleware/jwt.middleware.js";
import connectUsingMongoose from "./src/config/mongoose.config.js"

const app = express();

const port = process.env.PORT || 3000;

const corsOptions ={
  origin:'https://chatflow-production.up.railway.app',
  methods: 'GET,POST,PUT,DELETE',
  credentials:true, 
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(cookieParser());

app.use("/api/users", userRouter);

app.use("/api/dashboard", jwtAuth, dashboardRouter);

app.use("/", (req, res, next) => {
  res.send("Welcome to the ChatFlow API");
});

app.use((err, req, res, next) => {
  console.log(err);

  if (err) {
    res.status(500).send("Fatal error, Please try later");
  }
});

app.use((req, res) => {
  res.status(404).send("404 Not Found!");
});


app.listen(port, function () {
  connectUsingMongoose();
  console.log(`Server is running on port ${port}`);
});