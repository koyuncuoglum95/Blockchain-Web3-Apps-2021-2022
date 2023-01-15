const Migrations = artifacts.require("Migrations");
const TaskList = artifacts.require("TaskList");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(TaskList);
};
