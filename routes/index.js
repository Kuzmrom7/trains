module.exports = app => {
  //app.use("/station", require("./station"));
  app.use("/trains", require("./trains/index"));
};
