const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

//import routes
bootcamp = require("./routes/bootcamps");
//load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

//import routes
const app = express();
const PORT = process.env.PORT || 5000;

const logger = (req, res, next) => {
  req.hello = "hello world";
  next();
};

//body parser
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcamp);

//error handler
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`rejection offf ${err.message}`);
  server.close(() => process.exit(1));
});
