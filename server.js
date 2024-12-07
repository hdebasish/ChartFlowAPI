import app from "./index.js"
import connectUsingMongoose from "./src/config/mongoose.config.js";

const port = process.env.PORT || 3000;

// Start the server and listen on port
app.listen(port, function () {
  connectUsingMongoose();
  console.log(`Server is running on port ${port}`);
});