pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";


contract TokenFarm { // We want this smart contract to take DAI deposits and issue Dapp tokens
 /*
 State variable, which means it will be storied on the block chain
 Visibility = public - you'll be able to access this variable from out side the
 block chain.
  */

  string public name = "Dapp TokenFarm";
  DappToken public dappToken;
  DaiToken public daiToken;

  constructor(DappToken _dappToken, DaiToken _daiToken) public {
    // we want a store a reference to the two tokens that have been deployed to the blockchain
    dappToken = _dappToken;
    daiToken = _daiToken;

  }


}
