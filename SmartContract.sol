// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract SmartContract {
    uint256 public myBalance;

    function getMyBalance() public view returns (uint256) {
        return myBalance;
    }

    function setMyBalance(uint256 _balance) public {
        myBalance = _balance;
    }

    // 可以让合约调用者传入 ETH， 取走 ETH
    // constructor() {}
}
