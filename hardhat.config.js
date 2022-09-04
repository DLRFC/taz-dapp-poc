require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

// Import task definitions

require("./tasks/deployTazMessage");
require("./tasks/createProof");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.13',
  networks: {
    hardhat: {
      forking: {
        url: process.env.GOERLI_URL,         
        blockNumber: 7527783
      }

    },
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
}
