const express = require("express");
const router = express.Router();
const request = require("request");
const { filter } = require("lodash");

const getURL = stationName => {
  return `http://www.rzd.ru/suggester?compactMode=y&stationNamePart=${encodeURI(
    stationName
  )}&lang=ru`;
};

const serializeBody = (body, query) => {
  return filter(body, o => {
    return o.n.includes(query);
  });
};

router.get("/", async (req, res) => {
  try {
    const query = req.query;
    const q = query.q.toUpperCase();
    let url = getURL(q);
    request(url, async (error, response, body) => {
      try {
        const data = await serializeBody(JSON.parse(body), q);
        res.send(JSON.stringify(data));
      } catch (e) {
        res.sendStatus(400);
        res.json({
          error: e
        });
      }
    });
  } catch (e) {
    res.json({
      error: e
    });
  }
});

module.exports = router;
