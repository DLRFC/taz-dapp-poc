require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

// Import task definitions
require('./tasks/deploy')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.13',
  networks: {
    hardhat: {
      forking: {
        url: process.env.GOERLI_URL,
        blockNumber: 7486741,
      },
    },
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
}
