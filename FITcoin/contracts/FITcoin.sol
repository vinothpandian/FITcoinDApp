pragma solidity ^0.4.2;

contract FITcoin {
    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;


    /* Initializes contract with initial supply tokens to the creator of the contract */
    function FITcoin(uint256 initialSupply) {
        balanceOf[msg.sender] = initialSupply;              // Give the creator all initial tokens
    }

    /* Send coins */
    function transfer(address _to, uint256 _value) {
        if (balanceOf[msg.sender] < _value) throw;           // Check if the sender has enough
        if (balanceOf[_to] + _value < balanceOf[_to]) throw; // Check for overflows
        balanceOf[msg.sender] -= _value;                     // Subtract from the sender
        balanceOf[_to] += _value;                            // Add the same to the recipient
    }

    function getBalance(address _from) returns (uint256) {
      return balanceOf[_from];
    }
}
