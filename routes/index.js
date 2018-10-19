module.exports = app => {
  app.use("/stations", require("./stations"));
  app.use("/trains", require("./trains"));
};
