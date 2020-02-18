const Web3 = require("web3")
const daiToken = require("../../dai_token_abi.json")
const config = require("../get-config")

let web3, nonce
web3 = new Web3(new Web3.providers.HttpProvider(config.rpcOrigin))

const safeContract = new web3.eth.Contract(daiToken, config.tokenAddress)
console.log(`[WEB3] Contract initialized at ${config.tokenAddress}`)

// sends some tokens to the given account <userAddr>, invokes the given callback with the resulting transaction hash
const refuelAccount = async (faucetAmountWei, userAddr, callback) => {
  console.log(
    `[FAUCET] Sending ${web3.utils
      .toBN(faucetAmountWei)
      .toString()} tokens to ${userAddr}...`
  )

  if (!nonce) {
    nonce = await web3.eth.getTransactionCount(config.address)
  } else {
    nonce += 1
  }

  const txObj = {
    from: config.address,
    to: config.tokenAddress,
    nonce,
    data: safeContract.methods
      .transfer(userAddr, web3.utils.toBN(faucetAmountWei).toString())
      .encodeABI(),
    gas: config.gas
  }
  const signedTxObj = await web3.eth.accounts.signTransaction(
    txObj,
    config.privateKey
  )

  web3.eth
    .sendSignedTransaction(signedTxObj.rawTransaction)
    .once("transactionHash", txHash => {
      console.log(
        `[FAUCET] waiting for processing of token transfer transaction ${txHash}`
      )
      callback(null, txHash)
    })
    .once("receipt", receipt => {
      if (!receipt.status) {
        console.error(
          `[FAUCET] Token transfer transaction ${receipt.transactionHash} failed`
        )
      } else {
        console.log(
          `[FAUCET] Token transfer transaction ${receipt.transactionHash} executed in block ${receipt.blockNumber} consuming ${receipt.gasUsed} gas`
        )
      }
    })
    .on("error", err => {
      console.error(`[FAUCET] Token transfer transaction failed: ${err}`)
      callback(err, null)
    })
}

const getDaiTokenInWallet = async walletAddress => {
  const balance = await getBalance(daiContract, walletAddress)
  return web3.utils.fromWei(web3.utils.toBN(balance))
}

const getBalance = (contract, walletAddress) =>
  contract.methods
    .balanceOf(walletAddress)
    .call()
    .then(safe => safe)

module.exports = {
  refuelAccount,
  getDaiTokenInWallet,
  getBalance
}
