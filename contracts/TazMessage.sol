//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.13;
import "hardhat/console.sol";

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

interface ISemaphore {
    function verifyProof(uint256 groupId, bytes32 signal, uint256 nullifierHash, uint256 externalNullifier, uint256[8] calldata proof) external;
}

contract TazMessage is Ownable { 

    ISemaphore public semaContract;

    event MessageAdded(uint256 parentMessageId, uint256 messageId, string messageContent);

    constructor(ISemaphore semaContractAddr) {
        semaContract = semaContractAddr;
        console.log("Deploying a TazMessage contract with owner:", msg.sender);
    }

    function addMessage(uint256 messageId, string memory messageContent) external {
        emit MessageAdded(0, messageId, messageContent);
    }

    function replyToMessage(uint256 parentMessageId, uint256 messageId, string memory messageContent) external {
        emit MessageAdded(parentMessageId, messageId, messageContent);
    }

    // This method will emit an event of signature ProofVerified(uint256 indexed groupId, bytes32 signal) if the proof is verified.
    function verifyProof(uint256 groupId, bytes32 signal, uint256 nullifierHash, uint256 externalNullifier, uint256[8] calldata proof) external {
        semaContract.verifyProof(groupId, signal, nullifierHash, externalNullifier, proof);
    }

}