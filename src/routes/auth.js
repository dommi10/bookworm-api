import express from "express";
import User from "../models/user";

const router = express.Router();

router.post("/", (req, res) => {
  const { credentials } = req.body;

  User.findOne({ email: credentials.email }).then((user) => {
    if (user && user.isValidPassord(credentials.password)) {
      res.status(200).json({ user: { email: user.email } });
    } else {
      res.status(400).json({ errors: { global: p } });
    }
  });
});

export default router;
