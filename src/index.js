import express from "express";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());

app.post("/api/auth", (req, res) => {
  res.status(400).json({ errors: { global: "Invalid credentials" } });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8000, () => console.log("runing on localhost:8080"));
