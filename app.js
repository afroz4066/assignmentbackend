const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: ["", "http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "HEAD"],
    credentials: true,
  })
);

// app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const contact = require("./controller/contact");

app.use("/api/contact", contact);
module.exports = app;
