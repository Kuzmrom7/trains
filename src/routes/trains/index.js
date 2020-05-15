const { setupURL, getRid, timeout } = require("./utils");
const { data } = require("../../utils/responseExample");

const express = require("express");
const router = express.Router();
const request = require("request");
const cookieParser = require("cookie-parser");

router.get("/", (req, res) => {
  const query = req.query;

  request(
    getRid(query.from, query.to, query.date),
    async (error, response, bodyRid) => {
      try {
        const bodyParser = await JSON.parse(bodyRid);
        const cookie = await cookieParser.JSONCookies(response.headers);
        const rid = bodyParser.rid;
        await timeout(1000);
        request(setupURL(rid, cookie), async (error, resp, body) => {
          res.send(JSON.stringify(JSON.parse(body)));
        });
      } catch (e) {
        console.log("error:", e);
        res.json({
          error: e
        });
      }
    }
  );
});

router.get("/dev", (req, res) => {
  res.json(data);
});

module.exports = router;
