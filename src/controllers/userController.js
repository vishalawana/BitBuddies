const User = require("../models/user");

// POST /signup
exports.signup = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /:id
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// PUT /:id (replace user)
exports.replaceUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User replaced successfully", data: user });
  } catch (err) {
    next(err);
  }
};

// PATCH /:id (partial update)
exports.updateUser = async (req, res, next) => {
  const allowedFields = ["photoUrl", "about", "gender", "skills"];
  const isUpdateAllowed = Object.keys(req.body).every((key) =>
    allowedFields.includes(key)
  );

  if (!isUpdateAllowed) {
    return res.status(400).json({ message: "Invalid fields in update" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully", data: user });
  } catch (err) {
    next(err);
  }
};

// GET /feed
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users.length) return res.json({ message: "No users found" });

    res.json(users);
  } catch (err) {
    next(err);
  }
};
