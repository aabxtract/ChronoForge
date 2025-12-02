// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title SimpleERC721Transfer
 * @dev A simple contract to transfer ERC721 NFTs from one wallet to another
 */
contract SimpleERC721Transfer {
    
    event NFTTransferred(
        address indexed nftContract,
        address indexed from,
        address indexed to,
        uint256 tokenId
    );
    
    /**
     * @dev Transfer an NFT from sender to recipient
     * @param nftContract The ERC721 contract address
     * @param to The recipient address
     * @param tokenId The token ID to transfer
     */
    function transferNFT(
        address nftContract,
        address to,
        uint256 tokenId
    ) external {
        require(nftContract != address(0), "Invalid NFT contract");
        require(to != address(0), "Invalid recipient address");
        
        IERC721 nft = IERC721(nftContract);
        
        // Check if sender owns the NFT
        require(
            nft.ownerOf(tokenId) == msg.sender,
            "You don't own this NFT"
        );
        
        // Transfer the NFT from sender to recipient
        nft.transferFrom(msg.sender, to, tokenId);
        
        emit NFTTransferred(nftContract, msg.sender, to, tokenId);
    }
    
    /**
     * @dev Safe transfer an NFT (recommended method)
     * @param nftContract The ERC721 contract address
     * @param to The recipient address
     * @param tokenId The token ID to transfer
     */
    function safeTransferNFT(
        address nftContract,
        address to,
        uint256 tokenId
    ) external {
        require(nftContract != address(0), "Invalid NFT contract");
        require(to != address(0), "Invalid recipient address");
        
        IERC721 nft = IERC721(nftContract);
        
        // Check if sender owns the NFT
        require(
            nft.ownerOf(tokenId) == msg.sender,
            "You don't own this NFT"
        );
        
        // Safe transfer the NFT
        nft.safeTransferFrom(msg.sender, to, tokenId);
        
        emit NFTTransferred(nftContract, msg.sender, to, tokenId);
    }
    
    /**
     * @dev Transfer multiple NFTs in one transaction
     * @param nftContract The ERC721 contract address
     * @param to The recipient address
     * @param tokenIds Array of token IDs to transfer
     */
    function batchTransferNFT(
        address nftContract,
        address to,
        uint256[] calldata tokenIds
    ) external {
        require(nftContract != address(0), "Invalid NFT contract");
        require(to != address(0), "Invalid recipient address");
        require(tokenIds.length > 0, "No tokens to transfer");
        
        IERC721 nft = IERC721(nftContract);
        
        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            
            require(
                nft.ownerOf(tokenId) == msg.sender,
                "You don't own one or more NFTs"
            );
            
            nft.safeTransferFrom(msg.sender, to, tokenId);
            
            emit NFTTransferred(nftContract, msg.sender, to, tokenId);
        }
    }
    
    /**
     * @dev Check if sender owns a specific NFT
     * @param nftContract The ERC721 contract address
     * @param tokenId The token ID to check
     * @return True if sender owns the NFT
     */
    function ownsNFT(address nftContract, uint256 tokenId) external view returns (bool) {
        IERC721 nft = IERC721(nftContract);
        
        try nft.ownerOf(tokenId) returns (address owner) {
            return owner == msg.sender;
        } catch {
            return false;
        }
    }
    
    /**
     * @dev Get the owner of an NFT
     * @param nftContract The ERC721 contract address
     * @param tokenId The token ID to check
     * @return The owner address
     */
    function getNFTOwner(address nftContract, uint256 tokenId) external view returns (address) {
        IERC721 nft = IERC721(nftContract);
        return nft.ownerOf(tokenId);
    }
}
