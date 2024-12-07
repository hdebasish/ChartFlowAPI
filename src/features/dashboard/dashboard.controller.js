
import DashboardRepository from "./dashboard.repository.js";

export default class DashboardController {

    constructor() {
        this.dashboardRepository = new DashboardRepository();
    }

    async getUser(req, res, next) {
        try {

            res.send({
                name: req.user.name,
                email: req.user.email
            })
        } catch (error) {
            throw error;
        }
    }

    async getFeatures(req, res, next) {
        try {

            const startDate = req.query.start_date;
            const endDate = req.query.end_date;
            const age = req.query.age;
            const gender = req.query.gender;

            const featuresData = await this.dashboardRepository.getFeaturesData(startDate, endDate, age, gender);

            if (!featuresData) {
                return res.status(404).send("No data found");
            }
            res.status(200).send(featuresData);
        } catch (error) {
            next(error);
        }
    }


    async getTrend(req, res, next) {
        try {
            const startDate = req.query.start_date;
            const endDate = req.query.end_date;
            const age = req.query.age;
            const gender = req.query.gender;
            const category = req.query.category;

            const trendData = await this.dashboardRepository.getTrendData(startDate, endDate, age, gender, category);

            if (!trendData) {
                return res.status(404).send("No data found");
            }
            res.status(200).send(trendData);

        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            res.cookie('token', '', {
                httpOnly: true,
                secure: true, 
                sameSite: 'none',  
                expires: new Date(0), 
            });
            res.send('Logged out');
        } catch (error) {
            throw Error("Error logging out");
        }
    }
}