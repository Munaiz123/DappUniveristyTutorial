const DappToken = artifacts.require("DappToken")
const DaiToken = artifacts.require("DaiToken")
const TokenFarm = artifacts.require("TokenFarm");


module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  await deployer.deploy(DappToken)
  const dappToken = await DappToken.deployed()

  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)// TokenFarm constructor is being called
  const tokenFarm  = await TokenFarm.deployed()                       // and taking DAI and DAPP token addresses
//                                                                   // as inputs

 /* All smart contracts are on the block chain from the above code */

 /** Now we want to transfer tokens to TokenFarm from 'investor' */
 await dappToken.transfer(TokenFarm.address, "1000000000000000000000000")

 /** Reward investor 100 Mock DAI tokens */
 await daiToken.transfer(accounts[1], "100000000000000000000")

};

