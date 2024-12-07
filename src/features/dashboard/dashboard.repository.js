import { DashboardModel } from "./dashboard.schema.js";

export default class DashboardRepository {

    async insertBulkData(data) {
        try {
            await DashboardModel.deleteMany();
            return await DashboardModel.insertMany(data);
        } catch (error) {
            throw Error("Error uploading bulk data");
        }
    }

    async countDocuments() {
        try {
            return await DashboardModel.countDocuments();
        } catch (error) {
            throw Error("Error counting documents");
        }
    }

    async getAllData() {
        try {
            return await DashboardModel.find({});
        } catch (error) {
            throw Error("Error fetching all data");
        }
    }

    async getFeaturesData(startDate, endDate, age, gender) {
        try {

            let pipeline = [];

            if (startDate || endDate || age || gender) {

                const $match = {};

                if (startDate || endDate) {
                    const Day = {
                        "$gte": startDate ? new Date(startDate) : new Date("2022-10-04T00:00:00.000Z"),
                        "$lte": endDate ? new Date(endDate) : new Date("2022-10-29T00:00:00.000Z")
                    }

                    $match.Day = Day;
                }

                if (age) {

                    if (age === "15-25" || age === ">25") {
                        $match.Age = age;
                    }
                }

                if (gender) {
                    if (gender.toLowerCase() === "male") {
                        $match.Gender = "Male";
                    }

                    if (gender === "female") {
                        $match.Gender = "Female";
                    }
                }

                pipeline.push({
                    $match
                });

            }

            pipeline.push({
                "$group": {
                    "_id": null,
                    "totalA": { "$sum": "$A" },
                    "totalB": { "$sum": "$B" },
                    "totalC": { "$sum": "$C" },
                    "totalD": { "$sum": "$D" },
                    "totalE": { "$sum": "$E" },
                    "totalF": { "$sum": "$F" }
                }
            });


            pipeline.push({
                "$project": {
                    "_id": 0,
                    "totalA": 1,
                    "totalB": 1,
                    "totalC": 1,
                    "totalD": 1,
                    "totalE": 1,
                    "totalF": 1
                }
            });

            return await DashboardModel.aggregate(pipeline);;

        } catch (error) {
            throw Error("Error fetching features data");
        }
    }

    async getTrendData(startDate, endDate, age, gender, category = 'A') {
        try {
            let pipeline = [];

            if (startDate || endDate || age || gender) {

                const $match = {};

                if (startDate || endDate) {
                    const Day = {
                        "$gte": startDate ? new Date(startDate) : new Date("2022-10-04T00:00:00.000Z"),
                        "$lte": endDate ? new Date(endDate) : new Date("2022-10-29T00:00:00.000Z")
                    }

                    $match.Day = Day;
                }

                if (age) {

                    if (age === "15-25" || age === ">25") {
                        $match.Age = age;
                    }
                }

                if (gender) {
                    if (gender.toLowerCase() === "male") {
                        $match.Gender = "Male";
                    }

                    if (gender === "female") {
                        $match.Gender = "Female";
                    }
                }

                pipeline.push({
                    $match
                });

            }



            switch (category.toUpperCase()) {
                case "A":
                    pipeline.push({
                        "$group": {
                            "_id": null,
                            "listA": { "$push": { "A": "$A", "Day": "$Day" } },
                        }
                    });
                    pipeline.push({
                        "$project": {
                            "_id": 0,
                            "listA": 1,
                        }
                    });
                    pipeline.push({
                        "$unwind": "$listA"
                    });
                    pipeline.push({
                        $replaceRoot: { newRoot: "$listA" }
                    });
                    break;
                case "B":
                    pipeline.push({
                        "$group": {
                            "_id": null,
                            "listB": { "$push": { "B": "$B", "Day": "$Day" } },
                        }
                    });
                    pipeline.push({
                        "$project": {
                            "_id": 0,
                            "listB": 1,
                        }
                    });
                    pipeline.push({
                        "$unwind": "$listB"
                    });
                    pipeline.push({
                        $replaceRoot: { newRoot: "$listB" }
                    });
                    break;
                case "C":
                    pipeline.push({
                        "$group": {
                            "_id": null,
                            "listC": { "$push": { "C": "$C", "Day": "$Day" } },
                        }
                    });
                    pipeline.push({
                        "$project": {
                            "_id": 0,
                            "listC": 1,
                        }
                    });
                    pipeline.push({
                        "$unwind": "$listC"
                    });
                    pipeline.push({
                        $replaceRoot: { newRoot: "$listC" }
                    });
                    break;
                case "D":
                    pipeline.push({
                        "$group": {
                            "_id": null,
                            "listD": { "$push": { "D": "$D", "Day": "$Day" } },
                        }
                    });
                    pipeline.push({
                        "$project": {
                            "_id": 0,
                            "listD": 1,
                        }
                    });
                    pipeline.push({
                        "$unwind": "$listD"
                    });
                    pipeline.push({
                        $replaceRoot: { newRoot: "$listD" }
                    });
                    break;
                case "E":
                    pipeline.push({
                        "$group": {
                            "_id": null,
                            "listE": { "$push": { "E": "$E", "Day": "$Day" } },
                        }
                    });
                    pipeline.push({
                        "$project": {
                            "_id": 0,
                            "listE": 1,
                        }
                    });
                    pipeline.push({
                        "$unwind": "$listE"
                    });
                    pipeline.push({
                        $replaceRoot: { newRoot: "$listE" }
                    });
                    break;
                case "F":
                    pipeline.push({
                        "$group": {
                            "_id": null,
                            "listF": { "$push": { "F": "$F", "Day": "$Day" } },
                        }
                    });
                    pipeline.push({
                        "$project": {
                            "_id": 0,
                            "listF": 1,
                        }
                    });
                    pipeline.push({
                        "$unwind": "$listF"
                    });
                    pipeline.push({
                        $replaceRoot: { newRoot: "$listF" }
                    });
                    break;
                default:
                    break;
            }

            return await DashboardModel.aggregate(pipeline);;

        } catch (error) {
            throw Error("Error fetching trend data");
        }
    }

}