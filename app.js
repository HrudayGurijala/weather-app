const express = require("express");
const { getWeather } = require("./utils");
require('dotenv/config')

const app = express();
// console.log(process.env.API_KEY)
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});


app.get("/weather", (req, res) => {
  const { location } = req.query;
  const key = process.env.API_KEY;
  if (!location) {
    return res.send({
      message: "Invalid Location",
    });
  }

  getWeather(location,key, (error, response) => {
    if (error) {
      return res.status(400).send({ error });
    }
    res.status(200).send(response);
  });
});

app.get("/*", (req, res) => {
  res.status(404).send("Not found");
});

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
