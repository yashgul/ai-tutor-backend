const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.cjs");
const Course = require("../models/course.cjs");
require("dotenv").config();

router.get("/", async function (req, res, next) {
  const courses = await Course.find({});
  console.log(courses);
  return res
    .status(200)
    .send({ message: "courses retrieved", courses: courses });
});

router.post("/createCourse", async function (req, res, next) {
  let { name, about, rating, image, modules, ratingNum, what_learn } = req.body;
  const newcourses = new Course({
    name: name,
    about: about,
    ratingNum: ratingNum,
    rating: rating,
    image: image,
    modules: modules,
    what_learn: what_learn,
  });

  await newcourses.save();

  return res.status(200).send({ message: "courses added" });
});

router.get("/coursedetails/:courseid", async function (req, res, next) {
  const courseid = req.params.courseid;

  const coursedetails = await Course.findOne({ _id: courseid });

  return res
    .status(200)
    .send({ message: "course retrieved", coursedetails: coursedetails });
});

router.post("/registerCourse/:userId", (req, res, next) => {});

module.exports = router;
