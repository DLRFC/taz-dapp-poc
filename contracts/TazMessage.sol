//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.13;
import "hardhat/console.sol";

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

interface ISemaphore {
    function verifyProof(uint256 groupdId, bytes32 signal, uint256 nullifierHash, uint256 externalNullifier, uint256[8] calldata proof) external;
}

contract TazMessage is Ownable { 

    ISemaphore public semaContract;

    event MessageAdded(uint256 _parentMessageId, uint256 _messageId, string _messageContent);

    constructor(ISemaphore _semaContract) {
        semaContract = _semaContract;
        console.log("Deploying a TazMessage contract with owner:", msg.sender);
    }

    function addMessage(uint256 _messageId, string memory _messageContent) external {
        emit MessageAdded(0, _messageId, _messageContent);
    }

    function replyToMessage(uint256 _parentMessageId, uint256 _messageId, string memory _messageContent) external {
        emit MessageAdded(_parentMessageId, _messageId, _messageContent);
    }

}