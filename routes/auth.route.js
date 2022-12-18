const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const User = require("../models/user.model");
const { authSchema } = require("../helpers/validate_schema");
const { signAccessToken } = require("../helpers/jwt_helper");
const { create } = require("../models/user.model");

router.post("/register", async (req, res, next) => {
  try {
    // const { email, password } = req.body;
    // if(!email || !password){
    //     throw createError.BadRequest();
    // }
    const result = await authSchema.validateAsync(req.body);

    const alreadyExist = await User.findOne({ email: result.email });
    if (alreadyExist) {
      throw createError.Conflict(`${result.email} is already exists`);
    }

    const user = new User(result);
    const saveUser = await user.save();
    const accessToken = await signAccessToken(saveUser.id);
    // res.send(saveUser);
    res.send({ accessToken });
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const user = await User.findOne({email : result.email});

    if(!user) throw createError.NotFound("User not found");
    
    const isMatch = await user.isValidPassword(result.password);
    if(!isMatch) throw createError.Unauthorized('Username/password not valid');

    const accessToken = await signAccessToken(user.id);

    res.send({accessToken });
  } catch (error) {
    if (error.isJoi === true) {
      return next(createError.BadRequest("Invalid username/password"))
    }
    next(error);
  }
});

router.post("/refresh-token", async (req, res, next) => {
  res.send("refresh token route");
});

router.delete("/logout", async (req, res, next) => {
  res.send("logout route");
});

module.exports = router;
