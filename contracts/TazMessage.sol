//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.13;
import "hardhat/console.sol";

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

interface ISemaphore {
    function verifyProof(uint256 groupId, bytes32 signal, uint256 nullifierHash, uint256 externalNullifier, uint256[8] calldata proof) external;
}

contract TazMessage is Ownable { 

    ISemaphore public semaContract;

    event MessageAdded(string parentMessageId, string messageId, string messageContent);

    constructor(ISemaphore semaContractAddr) {
        semaContract = semaContractAddr;
    }

    function addMessage(
        string memory messageId, 
        string memory messageContent, 
        uint256 groupId, 
        bytes32 signal, 
        uint256 nullifierHash, 
        uint256 externalNullifier, 
        uint256[8] calldata proof) external {

        // Verify proof with Sempahore contract
        semaContract.verifyProof(groupId, signal, nullifierHash, externalNullifier, proof);

        // Emit event with message if verification was successful 
        emit MessageAdded("0", messageId, messageContent);
    }

    function replyToMessage(
        string memory parentMessageId, 
        string memory messageId, 
        string memory messageContent,
        uint256 groupId, 
        bytes32 signal, 
        uint256 nullifierHash, 
        uint256 externalNullifier, 
        uint256[8] calldata proof) external {

        // Require a valid parentMessageId
        require(
            bytes(parentMessageId).length > 0 
            && keccak256(abi.encodePacked(parentMessageId)) != keccak256(abi.encodePacked("0")), 
            "Invalid ID provided for parent message"
        );
        
        // Verify proof with Sempahore contract
        semaContract.verifyProof(groupId, signal, nullifierHash, externalNullifier, proof);

        // Emit event with message if verification was successful 
        emit MessageAdded(parentMessageId, messageId, messageContent);
    }
}