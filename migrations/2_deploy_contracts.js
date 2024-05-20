const SubjectChoosing = artifacts.require("SubjectChoosing");

module.exports = function (deployer) {
  deployer.deploy(SubjectChoosing, 5); // Deploy with a maximum of 5 students
};
