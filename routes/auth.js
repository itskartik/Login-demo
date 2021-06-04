const express = require("express");
const router = express.Router();

const { signup, signin, isSignedIn, signout } = require("../controllers/auth");
const { updateUser, getUserById, getUser } = require("../controllers/user");

router.param("userId", getUserById);

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/user/:userId", isSignedIn, getUser);

router.put("/user/:userId", isSignedIn, updateUser);

router.get("/signout", signout);

module.exports = router;
