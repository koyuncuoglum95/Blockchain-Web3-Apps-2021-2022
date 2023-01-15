pragma solidity >=0.7.0 <0.9.0;

contract MTCoin {
    // keyword public it's making the variables
    // here accessible from other contracts
    address public minter;
    // this means balances[address variable] = unit value or += unit value ( depending on what project you do)
    mapping(address => uint) public balances; 

    // Send tokens function in solidity
    // This is a syntax of Sent event for the tokens
    event Sent(address from, address to, uint amount);

    // constuctor only runs when we deploy contract
    constructor() {
        minter = msg.sender;

    }

    // make new coins and send them to an address
    // only the owner can send these coins
    function mint(address reciever, uint amount) public {
        require(msg.sender == minter);
        balances[reciever] += amount; // This is reciever amount which sent by the owner
    }


    error insufficientBalance(uint requested, uint available);


    // send any amount of coins to an existing address
    function send(address reciever, uint amount) public {
        if(amount > balances[msg.sender])
        revert insufficientBalance({
            requested: amount, // this shows requsted amount if sender doesn't have enough coin
            available: balances[msg.sender] // this shows how much coin the sender has now.
        });
        balances[msg.sender] -= amount; // this is decreasing the sender amount when sending
        balances[reciever] += amount; // this is increasing the reciever amount when sending
        emit Sent(msg.sender, reciever, amount);
    }

}