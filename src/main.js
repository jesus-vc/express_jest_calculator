import express from "express";
import fs from "fs";

import { ExpressError } from "../tests/custom_errors.js";

import {
  calculateMean,
  calculateMode,
  calculateMedian,
} from "./calculateFunctions.js";

const app = express();

app.get("/mean", (req, res) => {
  if (req.query.nums == undefined || req.query.nums.length == 0) {
    res.status(400).format({
      "text/html": function () {
        res.send("<p>nums are required</p>");
      },

      "application/json": function () {
        res.json({ msg: "nums are required" });
      },
      default: function () {
        res.status(406).send("Not Acceptable");
      },
    });
  }

  let nums = req.query.nums.split(",");

  const result = calculateMean(nums);
  const timestampResult = new Date();

  const contentJSON = {
    operation: "mean",
    timestamp: timestampResult,
    value: result,
  };
  const contentHTML = `<p>operation: "mean"</p>
  <p>timestamp: ${timestampResult}</p>
  <p>value: ${result.success}</p>`;

  if (req.query.save === "true") {
    fs.appendFile(
      "../var/log/resultsMean.json",
      JSON.stringify(contentJSON) + "\n",
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
    fs.appendFile("../var/log/resultsMean.html", contentHTML + "<p>", (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
  if (result.errorNaN) {
    res.status(400).format({
      "text/html": function () {
        res.send(`<p>${result.errorNaN} is not a number.</p>`);
      },
      "application/json": function () {
        res.json({ msg: `${result.errorNaN} is not a number.` });
      },
      default: function () {
        res.status(406).send("Not Acceptable");
      },
    });
  } else {
    res.status(200).format({
      "text/html": function () {
        res.send(contentHTML);
      },
      "application/json": function () {
        res.json(contentJSON);
      },
      default: function () {
        res.status(406).send("Not Acceptable");
      },
    });
  }
});

app.get("/mode", (req, res) => {
  if (req.query.nums == undefined || req.query.nums.length == 0) {
    res.status(400).format({
      "text/html": function () {
        res.send("<p>nums are required</p>");
      },

      "application/json": function () {
        res.json({ msg: "nums are required" });
      },
      default: function () {
        res.status(406).send("Not Acceptable");
      },
    });
  }
  let nums = req.query.nums.split(",");

  const result = calculateMode(nums);
  const timestampResult = new Date();

  const contentJSON = {
    operation: "mode",
    timestamp: timestampResult,
    value: result,
  };
  const contentHTML = `<p>operation: "mode"</p>
  <p>timestamp: ${timestampResult}</p>
  <p>value: ${result.success}</p>`;

  if (req.query.save === "true") {
    fs.appendFile(
      "../var/log/resultsMode.json",
      JSON.stringify(contentJSON) + "\n",
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
    fs.appendFile("../var/log/resultsMode.html", contentHTML + "<p>", (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  if (result.error) {
    res.status(400).format({
      "text/html": function () {
        res.send(`<p>${result.error} is not a number.</p>`);
      },

      "application/json": function () {
        res.json({ msg: `${result.error} is not a number.` });
      },
      default: function () {
        res.status(406).send("Not Acceptable");
      },
    });
  } else {
    res.status(200).format({
      "text/html": function () {
        res.send(contentHTML);
      },

      "application/json": function () {
        res.json(contentJSON);
      },
      default: function () {
        res.status(406).send("Not Acceptable");
      },
    });
  }
});

app.get("/median", (req, res) => {
  if (req.query.nums == undefined || req.query.nums.length == 0) {
    res.status(400).format({
      "text/html": function () {
        res.send("<p>nums are required</p>");
      },

      "application/json": function () {
        res.json({ msg: "nums are required" });
      },
      default: function () {
        res.status(406).send("Not Acceptable");
      },
    });
  }
  let nums = req.query.nums.split(",");

  const result = calculateMedian(nums);
  const timestampResult = new Date();

  const contentJSON = {
    operation: "median",
    timestamp: timestampResult,
    value: result,
  };
  const contentHTML = `<p>operation: "median"</p>
  <p>timestamp: ${timestampResult}</p>
  <p>value: ${result.success}</p>`;

  if (req.query.save === "true") {
    fs.appendFile(
      "../var/log/resultsMedian.json",
      JSON.stringify(contentJSON) + "\n",
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
    fs.appendFile(
      "../var/log/resultsMedian.html",
      contentHTML + "<p>",
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  }

  if (result.error) {
    res.status(400).format({
      "text/html": function () {
        res.send(`<p>${result.error} is not a number.</p>`);
      },
      "application/json": function () {
        res.json({ msg: `${result.error} is not a number.` });
      },
      default: function () {
        res.status(406).send("Not Acceptable");
      },
    });
  } else {
    res.status(200).format({
      "text/html": function () {
        res.send(contentHTML);
      },
      "application/json": function () {
        res.json(contentJSON);
      },
      default: function () {
        res.status(406).send("Not Acceptable");
      },
    });
  }
});

//Get all (mode, median, mean)
app.get("/all", (req, res, next) => {
  try {
    if (req.query.nums === undefined) {
      throw new ExpressError("Hey, invalid username!", 494);
    }
    if (req.query.nums.length === 0) {
      throw new ExpressError("Hey, nums are required!", 496);
      //res.status(400).json({ msg: "nums are required" });
    }

    let nums = req.query.nums.split(",");
    debugger;
    const meanResult = calculateMean(nums).success;
    const medianResult = calculateMedian(nums).success;
    const modeResult = calculateMode(nums).success;
    const timestampResult = new Date();

    const contentJSON = {
      operation: "all",
      timestamp: timestampResult,
      mean: meanResult,
      median: medianResult,
      mode: modeResult,
    };

    const contentHTML = `<p>operation: "all"</p>
      <p>timestamp: ${timestampResult}</p>
      <p>mean: ${meanResult}</p>
      <p>median: ${medianResult}</p>
      <p>mode: ${modeResult}</p>`;

    if (req.query.save === "true") {
      fs.appendFile(
        "resultsAll.json",
        JSON.stringify(contentJSON) + "\n",
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
      fs.appendFile("resultsAll.html", contentHTML + "<p>", (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    res.status(200).format({
      "text/html": function () {
        res.send(contentHTML);
      },

      "application/json": function () {
        res.json(contentJSON);
      },

      default: function () {
        // log the request and respond with 406
        res.status(406).send("Not Acceptable");
      },
    });
  } catch (e) {
    next(e);
  }
});

app.get("/headers", (req, res, next) => {
  res.format({
    "text/html": function () {
      res.send("<p>hey</p>");
    },

    "application/json": function () {
      res.json({ message: "hey" });
    },

    default: function () {
      // log the request and respond with 406
      res.status(406).send("Not Acceptable");
    },
  });
  return next("passing error");
  console.log("this shouldnt pass");
});

//If none of the routes above match.
app.use((req, res, next) => {
  const error = new ExpressError("That route doesn't exist!", 309);
  return next(error);
});

//Error handler
app.use((error, req, res, next) => {
  const status = error.status || 501;
  const message =
    error.message || "Oops. Something else went wrong. We've been notified...";
  return res.status(status).send(message);
});

app.listen(3002);
