pragma solidity ^0.6.0;

contract Counter{
    // basic state variable that gets stored on the blockchain - we can check them out later
    uint public count;


    constructor() public{
        // runs only once whenever the smart contract is deployed to the blockchain
        count = 0;
    }

    function getCount() public view returns(uint) {
        return count;
    }

    function incrementCount() public {
        // we're updating the state of the contract on the block chain
        count ++;
    }
}
