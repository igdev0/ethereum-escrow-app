// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Escrow {
    address public arbiter;
    address public beneficiary;
    address public depositor;
    event Approved(uint);
    bool public approved;
    constructor(address _arbiter, address _beneficiary) payable {
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = msg.sender;
        (bool success, ) = address(this).call{value: msg.value}("");
        require(success);
    }

    function approve() external {
        require(!approved, "This Escrow is been approved already!");
        require(msg.sender == arbiter, "You must be the arbiter in order to approve!");
        require(msg.sender != beneficiary, "You cannot be the arbiter and beneficiary at the same time!");
        require(msg.sender != depositor, "You cannot be the arbiter and depositor at the same time!");
        uint balance = address(this).balance;
        (bool sent, ) = address(beneficiary).call{value: balance }("");
        require(sent, "Failed to send value to beneficiary!");
        emit Approved(balance);
        approved = true;
    }
}