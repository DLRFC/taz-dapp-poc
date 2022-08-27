require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

// Import task definitions
require("./tasks/deploy");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.13",
  networks: {
    hardhat: {
    },
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRI_KEY]
    },
  },
};