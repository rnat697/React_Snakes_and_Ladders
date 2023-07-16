import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import cors from "cors";
import * as url from "url";
import mongoose from "mongoose";
import routes from "./routes/index";
import { main } from "./players-data/initdb.js";

mongoose.set("strictQuery", false);

// Setup Express
const app = express();
const port = process.env.PORT ?? 3000;

app.use(
  cors({
    credentials: true,
  })
);

// Setup JSON parsing for the request body
app.use(express.json());

// Setup our API routes.
app.use("/", routes);

// Make the "public" folder available statically
const dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use(express.static(path.join(dirname, "public")));

// Serve up the frontend's "dist" directory, if we're running in production mode.
if (process.env.NODE_ENV === "production") {
  console.log("Running in production!");

  // Make all files in that folder public
  app.use(express.static(path.join(dirname, "../frontend/dist")));

  // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
  app.get("*", (req, res) => {
    res.sendFile(path.join(dirname, "../frontend/dist/index.html"));
  });
}

// Start the DB running. Then, once it's connected, start the server.
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() =>
    app.listen(port, () => console.log(`App server listening on port ${port}!`))
  );

main();
