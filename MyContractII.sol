pragma solidity ^0.6.0;

contract MyContractII{
    // ARRAY
    uint[] public uintArray = [1,2,3];
    string[] public stringArray = ["Apple", "Mango", "Watermelon"];
    string[] public myArray;
    uint[][] public twoDArray = [[1,2,3], [4,5,6]];


    function addValue(string memory _value) public{
        myArray.push(_value);
    }

    function valueCount() public view returns(uint){
        return myArray.length;
    }



}
