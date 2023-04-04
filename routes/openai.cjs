const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.cjs");
require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post("/explain", async function (req, res, next) {
  const { topic } = req.body;
  const prompt = `Provide a question related to ${topic}?Give answer to the same question?Give a hint to the same question that does not completely solve the question In json format with keys question,answer and hint`;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 300,
    });
    const obj = JSON.parse(completion.data.choices[0].text.trim());
    console.log("question:", obj.question, "hint:", obj.hint);

    console.log("\n\n", completion.data.choices[0].text);

    return res.status(200).send({
      message: "Successfully Completed",
      data: {
        question: obj.question,
        answer: obj.answer,
        hint: obj.hint,
      },
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);

      const err = {
        status: error.response.status,
        data: error.response.data,
      };
      res.status(500).send({
        error: err,
      });
    } else {
      console.log(error.message);

      const err = {
        message: error.message,
      };
      res.status(500).send({
        error: err,
      });
    }
  }
});

router.post("/doubt", async function (req, res, next) {
  const { topic, doubt } = req.body;
  const prompt = `With respect to ${topic + " " + doubt} `;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 50,
    });

    console.log("\n\n", completion.data.choices[0].text);

    return res.status(200).send({
      message: "Successfully Completed",
      data: {
        question: doubt,
        answer: completion.data.choices[0].text,
      },
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);

      const err = {
        status: error.response.status,
        data: error.response.data,
      };
      res.status(500).send({
        error: err,
      });
    } else {
      console.log(error.message);

      const err = {
        message: error.message,
      };
      res.status(500).send({
        error: err,
      });
    }
  }
});

module.exports = router;
