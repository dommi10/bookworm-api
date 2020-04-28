import express from "express";
import User from "../models/user";

const router = express.Router();

router.post("/", (req, res) => {
  const { creditianls } = req.body;
  User.findOne({ email: creditianls.email }).then((user) => {
    if (user) {
      
    } else {
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  });
});

export default router;
