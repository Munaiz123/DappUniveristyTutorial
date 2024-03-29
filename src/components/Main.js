import React, {useState} from 'react'
import dai from "../dai.png"

const Main = props =>{

  const [input, setInput] = useState('')

  function onSubmit  (event){
    event.preventDefault()
    let amount;
    amount = input.toString()
    amount = window.web3.utils.toWei(amount, 'Ether')
    props.stakeTokens(amount)
  }

  function unStakeOnClick(event){
    event.preventDefault()
    props.unstakeTokens()
  }


  return(
    <div id='content' className="mt-3">

      <table className="table table-borderless text-muted text-center">
        <thead>
          <tr>
            <th scope="col">Staking Balance</th>
            <th scope="col">Reward Balance</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{window.web3.utils.fromWei(props.stakingBalance, "Ether")} mDAI</td>
            <td>{window.web3.utils.fromWei(props.dappTokenBalance, "Ether")} DAPP</td>
          </tr>
        </tbody>
      </table>

      <div className="card mb-4">
        <div className="card-body">
          <h6>Hello World <span role="img" aria-label="emoji">🤙🏽 🌍 </span></h6>

          <form className="mb-3" onSubmit={onSubmit}>
              <div>
                <label className="float-left"><b>Stake Tokens</b></label>
                <span className="float-right text-muted">
                  Balance: {window.web3.utils.fromWei(props.daiTokenBalance, 'Ether')}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  onChange={e => setInput(e.target.value)}
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={dai} height='32' alt=""/>
                    &nbsp;&nbsp;&nbsp; mDAI
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">STAKE!</button>
            </form>
            <button type="submit" onClick={unStakeOnClick}>STAKE!</button>

        </div>
      </div>
    </div>
  )
}

export default Main
