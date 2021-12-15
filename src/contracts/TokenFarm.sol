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
  address public owner;

  address[] public stakers;
  mapping(address => uint) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  constructor(DappToken _dappToken, DaiToken _daiToken) public {
    // we want a store a reference to the two tokens that have been deployed to the blockchain
    dappToken = _dappToken;
    daiToken = _daiToken;
    owner = msg.sender;

  }


   //  1. Stake Tokens (Deposit)
   function stakeTokens(uint _amount) public{
      // requires that amount is greater than 0 or else the rest of the code in this function will not run
     require(_amount > 0, "ammount can't be 0");

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
   //  2. Issuing Tokens (interest)

   function issueTokens() public{
     // only the owner of this
     require(msg.sender == owner, "caller must be the owner");

      //  loop through all of the people who are in the stakedArray
      // issue tokens to stakers

      for (uint i = 0; i< stakers.length; i++){
      address recipient = stakers[i];
      uint balance = stakingBalance[recipient];
      if(balance > 0){
        dappToken.transfer(recipient, balance);
      }
    }
   }

   //  3. Unstaking Tokens (Withdraw) - allowing investor to withdraw their tokens

   function unstakeTokens() public{
     //fetch staking balance from investor
     uint balance = stakingBalance[msg.sender];

     // amount needs to be greater than 0
     require(balance > 0, "staking balance cannot be 0");

     daiToken.transfer(msg.sender, balance);

     // reset staking balance
     stakingBalance[msg.sender] = 0;

     // update staking status
     isStaking[msg.sender] = false;

   }

}
