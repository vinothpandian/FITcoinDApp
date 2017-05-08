var FITcoin = artifacts.require("./FITcoin.sol")

module.exports = function(deployer) {
  deployer.deploy(FITcoin, 10000);
};
