pragma solidity ^0.6.0;

contract MyContract{
    // State Variables => Stored on the blockchain

    //INTEGERS
    uint public myUint = 1;
    int public myInt = 1;
    uint256 public myUint256 = 1;
    uint8 public myUint8 = 1;

    string public myString = 'Hello, World!';
    bytes32 public myBytes32 = 'Hello, World!';
    // address public myAddress = 0x123;

    struct MyStruct{
        uint myUint;
        string myName;
    }

    MyStruct public myStruct = MyStruct(1, "Hello, World!");





    // Local Variables
    function getValue() public pure returns(uint){
        uint value = 1;
        return value;
    }

}
