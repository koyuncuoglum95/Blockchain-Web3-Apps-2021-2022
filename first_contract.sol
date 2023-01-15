// This is our first solidity code

// This one allow us to use the versions of solidity
pragma solidity >=0.7.0 <0.9.0;

// create a contract that can store data and return the data block

// be able to do the following:

// 1.) Receive the information, 2.) Store the information, 3.) Return the information the block
// A contract in the sense  of solidity is a collection of code (its function) and data (its state) that resides at specific address on Etherium Blockchain. 

contract Number {
    // Write all the code inside here -- functions and its state

    uint storeData;

    // A function is a group of reusable code that can be used anywhere in your application. 
    // set and get
    // public enables visibility so that we can use call this outside of the contract itself

    function set(uint x) public {
        storeData = x * 5;
    }

    function get() public view returns (uint) {
        return storeData;
    }

}