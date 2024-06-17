/* eslint-disable import/extensions */
import Express from "express";
import db from "./config/connection.js";
import api from "./controllers/index.js";

const PORT = 3001 || process.env.PORT;
const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use("/api", api);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
