import mongoose from "mongoose";
import DataRepository from "../features/dashboard/dashboard.repository.js";
import DataUtils from "../features/dashboard/dashboard.utils.js";
import cron from "node-cron";

const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected using Mongoose");
    initiateCornJob();
  } catch (error) {
    throw error;
  }
};


const initiateCornJob = async () => {
  try {
    const dataRepository = new DataRepository();
    cron.schedule('0 0 0 * * *', async () => {

    });
    const data = await DataUtils.getDataFromExcel("./Frontend Developer Assignment Data.xlsx");
    const insertedData = await dataRepository.insertBulkData(data);
    if (insertedData) {
      console.log("Data updated successfully");
    }
  } catch (error) {
    throw error;
  }
}



export default connectUsingMongoose;