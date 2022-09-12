//SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface ISemaphore {
    function verifyProof(
        uint256 groupId,
        bytes32 signal,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof
    ) external;
}

contract TazToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // Stores the address of the Semaphore contract used for verifications
    ISemaphore public semaContract;

    event NewToken(uint256 tokenId, string uri);

    constructor(ISemaphore semaContractAddr) ERC721("TazToken", "TAZ") {
         semaContract = semaContractAddr;
    }

    // Verifies a proof and mints a non-fungible token
    function safeMint(
        address to,
        string memory uri,
        uint256 groupId,
        bytes32 signal,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof) public onlyOwner returns (uint256){
        uint256 tokenId = _tokenIdCounter.current();

        // Verify proof with Sempahore contract
        semaContract.verifyProof(groupId, signal, nullifierHash, externalNullifier, proof);

        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit NewToken(tokenId, uri);

        return tokenId;
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
