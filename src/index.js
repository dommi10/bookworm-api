import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import auth from './routes/auth';
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/bookworm", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('api/auth', auth);

app.post("/api/auth", (req, res) => {
  res.status(400).json({ errors: { global: "Invalid credentials" } });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8000, () => console.log("runing on localhost:8080"));
