import express from "express"
import DashboardController from "./dashboard.controller.js";
const dashboardRouter = express.Router();

const dashboardController = new DashboardController();

dashboardRouter.get("/", (req, res, next) => {
    dashboardController.getUser(req, res, next);
});

dashboardRouter.get("/features", (req, res, next) => {
    dashboardController.getFeatures(req, res, next);
});

dashboardRouter.get("/trend", (req, res, next) => {
    dashboardController.getTrend(req, res, next);
});

dashboardRouter.post("/logout", (req, res, next) => {
    dashboardController.logout(req, res, next);
})

export default dashboardRouter;