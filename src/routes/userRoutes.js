const express = require("express");
const {
  signup,
  deleteUser,
  replaceUser,
  updateUser,
  getUsers,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.delete("/:id", deleteUser);
router.put("/:id", replaceUser);
router.patch("/:id", updateUser);
router.get("/feed", getUsers);

module.exports = router;
