import React, { Component } from 'react'
import Web3 from 'web3'

import Navbar from './Navbar'
import Main from "./Main"
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

    await this.loadDaiToken(networkId, web3)
    await this.loadDappToken(networkId, web3)
    await this.loadTokenFarm(networkId, web3)

    this.setState({loading:false})
  }

  async loadDaiToken(networkId,web3){
    let daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData){
      let daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()

      this.setState({daiToken})
      this.setState({daiTokenBalance:daiTokenBalance.toString()})
    } else {
      window.alert("DaiToken contract not deployed to detected network")
    }
  }

  async loadDappToken(networkId,web3){
    let dappTokenData = DappToken.networks[networkId]
    if(dappTokenData){

      let dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address)
      let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call()


      this.setState({dappToken})
      this.setState({dappTokenBalance:dappTokenBalance.toString()})
    } else {
      window.alert("DappToken contract not deployed to detected network")
    }
  }

  async loadTokenFarm(networkId,web3){
    let tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData){
      let tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()

      this.setState({tokenFarm})
      this.setState({stakingBalance:stakingBalance.toString()})

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

  stakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.tokenFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  unstakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.tokenFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }


  render() {
    let content;
    if(this.state.loading) content = <h6 id='loader' className="text-center">Loading...</h6>
    else content = <Main
                      daiTokenBalance={this.state.daiTokenBalance}
                      dappTokenBalance={this.state.dappTokenBalance}
                      stakingBalance={this.state.stakingBalance}
                      stakeTokens={this.stakeTokens}
                      unstakeTokens={this.unstakeTokens}
                    />

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
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
