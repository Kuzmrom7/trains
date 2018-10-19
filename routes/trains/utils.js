const getRid = () => {
  return "https://pass.rzd.ru/timetable/public/ru?STRUCTURE_ID=735&layer_id=5371&dir=0&tfl=3&refererPageId=4819&checkSeats=1&code0=2004001&dt0=20.10.2018&code1=2000000";
};
const getTrains = rid => {
  return `http://pass.rzd.ru/timetable/public/ru?STRUCTURE_ID=735&layer_id=5371&rid=${rid}`;
};

const timeout = ms => new Promise(res => setTimeout(res, ms));

const setupURL = (rid, cookie) => {
  return {
    url: getTrains(rid),
    method: "GET",
    headers: {
      Cookie: cookie["set-cookie"],
      "User-Agent": "Mozilla/5.0 ",
      Host: "pass.rzd.ru"
    }
  };
};

module.exports = { getRid, setupURL, timeout };
