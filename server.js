if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
var cors = require("cors");

const app = express();

app.use(cors());
//Middleware
app.use(express.json());

//Connect to mongo
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//Route Config
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

//Serve static assests if we are in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server connected at port ${port}`);
});
