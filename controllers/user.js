import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
const router = Router();

router.post("/", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  try {
    const password = hash;
    const { name, email, role } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    return res.status(200).send({ msg: "Success", user });
  } catch (err) {
    return res.status(401).send({ err });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send({ msg: "success", users });
  } catch (err) {
    return res.status(401).send({ err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const users = await User.findOne({ email: req.body.email });

    if (!users) {
      return res.status(401).send({ err: "not found" });
    }
    const compare = await bcrypt.compare(req.body.password, users.password);
    if (!compare) {
      return res.status(401).send({ err: "not found" });
    }
    const token = JWT.sign({ users }, "blog");
    return res.status(200).send({ msg: "Success", users, token });
  } catch (err) {
    return res.status(401).send({ err });
  }
});

export default router;
