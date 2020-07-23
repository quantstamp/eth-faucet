const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  ropsten: {
    rpcOrigin: `https://ropsten.infura.io/v3/58a6dc7fcbb34c809c1710e8585bca02`,
    privateKey: '0x0C1F3878EC10F90CCD38373809622CD1EA980164A29981E211B211E07605DA01',
    tokenAddress: '0x3478FdCd0bf38dAEB801Ff42849c11685f2e7bF0',
    amount: 100,
    decimals: 18,
    gas: 60000,
    maxBalance: 1000
  }
};
