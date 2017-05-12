pragma solidity ^0.4.8;

contract FITcoin {
    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;


    /* Initializes contract with initial supply coins from the truffle migrate*/
    function FITcoin(uint256 initialSupply) {
        balanceOf[msg.sender] = initialSupply;              // Give the creator all initial coins
    }

    /* Send coins */
    function transfer(address _to, uint256 _value) {
        if (balanceOf[msg.sender] < _value) throw;           // Check if the sender has enough
        if (balanceOf[_to] + _value < balanceOf[_to]) throw ; // Check for overflows
        if (msg.sender == _to) throw;                       // Check whether sender is receiver
        balanceOf[msg.sender] -= _value;                     // Subtract from the sender
        balanceOf[_to] += _value;                            // Add the same to the recipient
    }

    function getBalance() constant returns (uint256) {
      return balanceOf[msg.sender];
    }

}
