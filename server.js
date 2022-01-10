const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

//Middleware
app.use(bodyParser.json());

//DB Config
const dbKey = require("./config/keys").mongoURI;

//Connect to mongo
mongoose
  .connect(dbKey)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//Route Config
const items = require("./routes/api/items");
app.use("/api/items", items);

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
