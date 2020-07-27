const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  ropsten: {
    rpcOrigin: `https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`,
    privateKey: process.env.PRIVATE_KEY,
    tokenAddress: process.env.TOKEN_ADDRESS,
    tokenName: process.env.TOKEN_NAME,
    amount: 100,
    decimals: 6,
    gas: 60000,
    maxBalance: 1000
  }
};
