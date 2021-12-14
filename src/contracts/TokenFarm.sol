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

  address[] public stakers;
  mapping(address => uint) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  constructor(DappToken _dappToken, DaiToken _daiToken) public {
    // we want a store a reference to the two tokens that have been deployed to the blockchain
    dappToken = _dappToken;
    daiToken = _daiToken;

  }


   //  1. Stake Tokens (Deposit)
   function stakeTokens(uint _amount) public{
      // transfer DAI tokens from investor to this TokenFarm smart contract
      daiToken.transferFrom(msg.sender, address(this), _amount);
      //msg is a global variable -> msg.sender = the person that initiated the function
      stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

      //added user to stakers array ONLY if they haven't staked already
      if(!hasStaked[msg.sender]){
        stakers.push(msg.sender);
      }
      isStaking[msg.sender] = true;
      hasStaked[msg.sender] = true;
  }

   //  2. Unstaking Tokens (Withdraw)

   //  3. Issuing Tokens (interest)



}
