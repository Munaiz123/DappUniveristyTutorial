pragma solidity ^0.6.0;

contract HotelRoom{
    //Ether - Pay smart contracts , Modifiers,  Visibility , Events, Enums

    enum Status {Vacant, Occupied}
    Status currentStatus;

    event Occupy(address _occupant, uint _value);

    address payable public owner;


    constructor() public{
        owner = msg.sender;
        currentStatus = Status.Vacant;

    }

    modifier onlyWhileVacant{
        require(currentStatus == Status.Vacant, "Currently Occupied, bro.");
        _;

    }

    modifier costs (uint _amount){
        require(msg.value >= _amount, "Not enough $");
        _;
    }


    receive() external payable onlyWhileVacant costs(2 ether) {
        // this function will pay the owner Ether

        currentStatus = Status.Occupied;
        owner.transfer(msg.value);
        emit Occupy(msg.sender, msg.value);
    }
}
