import mongoose from "mongoose";
import DataRepository from "../features/dashboard/dashboard.repository.js";
import DataUtils from "../features/dashboard/dashboard.utils.js";

const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected using Mongoose");
    loadDataIfEmpty();
  } catch (error) {
    throw error;
  }
};

const loadDataIfEmpty = async () => {
  try {
    const dataRepository = new DataRepository();
    const data = await dataRepository.countDocuments();

    if (data === 0) {
      const data = await DataUtils.getDataFromExcel("./Frontend Developer Assignment Data.xlsx");
      const insertedData = await dataRepository.insertBulkData(data);
      if (insertedData) {
        console.log("Data inserted successfully");
      }
    }
  } catch (error) {
    throw error;
  }
}

export default connectUsingMongoose;