const { assert } = require('chai');

const DappToken = artifacts.require("DappToken")
const DaiToken = artifacts.require("DaiToken")
const TokenFarm = artifacts.require("TokenFarm");

require('chai')
.use(require('chai-as-promised'))
.should()

function tokens(n){
  return web3.utils.toWei(n, "ether")
}

contract('TokenFarm', ([owner, investor])=>{ // owner = the person who deplopyed dapp token to the network; investor = the person that holds dai and earns dapp token
  let daiToken, dappToken, tokenFarm;

  before( async () =>{  // mocking deploy script
    // loading contracts
    daiToken = await DaiToken.new()
    dappToken = await DappToken.new()
    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

    //transfer all Dapp tokens to TokenFarm
    await dappToken.transfer(tokenFarm.address, tokens("1000000"))

    //send tokens to investor - also need to pass the meta data from which account
    await daiToken.transfer(investor, tokens("100"), {from: owner})
  })

  describe('Mock Dai deployment', async ()=>{
    it('has a name', async ()=>{

      const name = await daiToken.name()
      assert.equal(name, 'Mock DAI Token')
    })
  })

  describe('Dapp Dai deployment', async ()=>{
    it('has a name', async ()=>{

      const name = await dappToken.name()
      assert.equal(name, 'DApp Token')
    })
  })

  describe('Token Farm deployment', async ()=>{
    it('has a name', async () =>{

      const name = await tokenFarm.name()
      assert.equal(name, 'Dapp TokenFarm')
    })

    it('contract has tokens', async ()=>{
      let balance = await dappToken.balanceOf(tokenFarm.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })

  })

  describe('Farming Tokens', async()=>{
    it('rewards investors for staking mDai tokens', async() =>{
      let result

      // check investor balance before staking
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct before staking')

      // stake mock DAI tokens
      await daiToken.approve(tokenFarm.address, tokens('100'), {from:investor})
      await tokenFarm.stakeTokens(tokens('100'), {from: investor})

      // check staking result
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('0'), 'investor Mock DAI Wallet balance correct after staking')

      result = await daiToken.balanceOf(tokenFarm.address)
      assert.equal(result.toString(), tokens('100'), 'Token Farm Mock DAI Balance correct after staking')

      result = await tokenFarm.stakingBalance(investor)
      assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')

      result = await tokenFarm.isStaking(investor)
      assert.equal(result.toString(), 'true', 'investor staking status correct after staking')

    })
  })

})
