import React, { Component } from 'react'
import Web3 from 'web3'

import Navbar from './Navbar'
import './App.css'
import DaiToken from '../abis/DaiToken.json'
import DappToken from '../abis/DappToken.json'
import TokenFarm from '../abis/TokenFarm.json'

class App extends Component {

  async componentDidMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      daiToken: {}, // smart contract
      dappToken:{}, // smart contract
      tokenFarm:{}, // smart contract
      daiTokenBalance:'0',
      dappTokenBalance:'0',
      stakingBalance: '0',
      loading: true
    }
  }

  async loadBlockchainData(){ // Fetching data from the block chain
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts() // fetching meta mask account address ?
    this.setState({account:accounts[0]})

    const networkId = await web3.eth.net.getId()
    console.log('NETWORK ID', networkId)

    await this.loadDaiToken(networkId, web3)
    await this.loadDappToken(networkId, web3)
    await this.loadTokenFarm(networkId, web3)

  }

  async loadDaiToken(networkId,web3){
    let daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData){
      console.log('Dai Token Address -> ',daiTokenData.address)
      let daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      console.log('DaiToken Balance =' , daiTokenBalance.toString())

      this.setState({daiToken})
      this.setState({daiTokenBalance:daiTokenBalance.toString()})
    } else {
      window.alert("DaiToken contract not deployed to detected network")
    }
  }

  async loadDappToken(networkId,web3){
    let dappTokenData = DappToken.networks[networkId]
    if(dappTokenData){
      console.log('Dapp Token Balance -> ',dappTokenData.address)
      let dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address)
      let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call()
      console.log('Dapp Token Balance =' , dappTokenBalance.toString())

      this.setState({dappToken})
      this.setState({dappTokenBalance:dappTokenBalance.toString()})
    } else {
      window.alert("DappToken contract not deployed to detected network")
    }
  }

  async loadTokenFarm(networkId,web3){
    let tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData){
      console.log('Token Farm Address -> ',tokenFarmData.address)
      let tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      // let tokenFarmBalance = await tokenFarm.methods.balanceOf(this.state.account).call().toString()
      // console.log('Token Farm Balance =' , tokenFarmBalance)


      this.setState({tokenFarm})
      // this.setState({tokenFarmBalance})

    } else {
      window.alert("TokenFarm contract not deployed to detected network")
    }
  }

  async loadWeb3(){ // connecting react app to MetaMask wallet via web3!
    if(window.ethereum){
      window.web3= new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }


  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                <h1>Hello, World!</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
