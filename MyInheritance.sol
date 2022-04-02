pragma solidity ^0.6.0;



contract Ownable{
    address owner;

     constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Must be owner !");
        _;
    }

}


contract SecretVault{
    string secret;

    constructor(string memory _secret)public {
        secret = _secret;
    }

    function getSecret() public view returns(string memory){
        return secret;

    }


}

contract MyInheritance is Ownable{
    // Inheritance - can also use libraries that are other smart contracts
    // Factories
    // Smart contract interactions

    address secretVaultAddress;

    constructor(string memory _secret)public {
        SecretVault secretVaultInst = new SecretVault(_secret);
        secretVaultAddress =  address(secretVaultInst);
        super;
    }

    function getSecret() public view onlyOwner returns(string memory){
        SecretVault secretVaultCon = SecretVault(secretVaultAddress);
        return secretVaultCon.getSecret();

    }

}
