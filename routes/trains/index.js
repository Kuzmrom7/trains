const { setupURL, getRid, timeout } = require("./utils");

const express = require("express");
const router = express.Router();
const request = require("request");
const cookieParser = require("cookie-parser");

router.get("/", (req, res) => {
  request(getRid(), async (error, response, bodyRid) => {
    try {
      const bodyParser = await JSON.parse(bodyRid);
      const cookie = await cookieParser.JSONCookies(response.headers);
      const rid = bodyParser.rid;
      await timeout(1000);
      request(setupURL(rid, cookie), async (error, resp, body) => {
        res.json(JSON.parse(body));
      });
    } catch (e) {
      console.log("error:", e);
    }
  });
});

module.exports = router;
