pragma solidity ^0.6.0;

contract MyContractIV{
    // Conditionals
    // Loops
    uint[] public numbersArray = [1,2,3,4,5,6,7,8,9,10];

    address public owner;

    constructor() public{
        owner = msg.sender;
    }



    function isEvenNumber(uint _number) public view returns(bool){
        if(_number % 2 == 0 ) {
            return true;
        } else {
            return false;
        }

    }

    function countEvenNumbers() public view returns(uint){
        uint evenCount = 0;

        for(uint i = 0; i < numbersArray.length; i++){
            uint number = numbersArray[i];
            if(number % 2 == 0){
                evenCount++;
            }

        }

        return evenCount;
    }

    function isOwner() public view returns(bool){
        return (msg.sender == owner);
    }
}
