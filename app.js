require("dotenv").config();

const express = require("express");
const app = express();
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const productsRouter = require("./routes/products");
const connectDB = require("./db/connect");

//routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products route</a>');
});

//middleware
app.use(express.json());
app.use("/api/v1/products", productsRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connect DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is lestening on ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
