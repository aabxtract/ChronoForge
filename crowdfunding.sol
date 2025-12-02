// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SimpleCrowdfunding
 * @dev A simple crowdfunding contract where contributors can fund a campaign
 */
contract SimpleCrowdfunding {
    
    // Campaign owner
    address public owner;
    
    // Campaign details
    string public campaignTitle;
    string public description;
    uint256 public goalAmount;
    uint256 public deadline;
    uint256 public totalFundsRaised;
    
    // Campaign status
    bool public campaignActive;
    bool public fundsWithdrawn;
    
    // Minimum contribution
    uint256 public minContribution = 0.000001 ether;
    
    // Track contributions
    mapping(address => uint256) public contributions;
    address[] public contributors;
    
    // Events
    event ContributionReceived(address indexed contributor, uint256 amount);
    event CampaignSuccessful(uint256 totalRaised);
    event CampaignFailed(uint256 totalRaised);
    event FundsWithdrawn(address indexed owner, uint256 amount);
    event RefundIssued(address indexed contributor, uint256 amount);
    
    /**
     * @dev Constructor to create a new campaign
     * @param _title Campaign title
     * @param _description Campaign description
     * @param _goalAmount Funding goal in wei
     * @param _durationInDays Campaign duration in days
     */
    constructor(
        string memory _title,
        string memory _description,
        uint256 _goalAmount,
        uint256 _durationInDays
    ) {
        require(_goalAmount > 0, "Goal must be greater than 0");
        require(_durationInDays > 0, "Duration must be greater than 0");
        
        owner = msg.sender;
        campaignTitle = _title;
        description = _description;
        goalAmount = _goalAmount;
        deadline = block.timestamp + (_durationInDays * 1 days);
        campaignActive = true;
        fundsWithdrawn = false;
    }
    
    /**
     * @dev Contribute to the campaign
     */
    function contribute() external payable {
        require(campaignActive, "Campaign is not active");
        require(block.timestamp < deadline, "Campaign has ended");
        require(msg.value >= minContribution, "Contribution below minimum");
        
        // If first time contributor, add to array
        if (contributions[msg.sender] == 0) {
            contributors.push(msg.sender);
        }
        
        contributions[msg.sender] += msg.value;
        totalFundsRaised += msg.value;
        
        emit ContributionReceived(msg.sender, msg.value);
        
        // Check if goal reached
        if (totalFundsRaised >= goalAmount) {
            emit CampaignSuccessful(totalFundsRaised);
        }
    }
    
    /**
     * @dev Withdraw funds if campaign is successful
     */
    function withdrawFunds() external {
        require(msg.sender == owner, "Only owner can withdraw");
        require(block.timestamp >= deadline, "Campaign still ongoing");
        require(totalFundsRaised >= goalAmount, "Goal not reached");
        require(!fundsWithdrawn, "Funds already withdrawn");
        
        fundsWithdrawn = true;
        campaignActive = false;
        
        uint256 amount = address(this).balance;
        payable(owner).transfer(amount);
        
        emit FundsWithdrawn(owner, amount);
    }
    
    /**
     * @dev Request refund if campaign failed
     */
    function refund() external {
        require(block.timestamp >= deadline, "Campaign still ongoing");
        require(totalFundsRaised < goalAmount, "Campaign was successful");
        require(contributions[msg.sender] > 0, "No contribution found");
        
        uint256 amount = contributions[msg.sender];
        contributions[msg.sender] = 0;
        
        payable(msg.sender).transfer(amount);
        
        emit RefundIssued(msg.sender, amount);
    }
    
    /**
     * @dev Check if campaign was successful
     */
    function isSuccessful() public view returns (bool) {
        return totalFundsRaised >= goalAmount && block.timestamp >= deadline;
    }
    
    /**
     * @dev Check if campaign has ended
     */
    function hasEnded() public view returns (bool) {
        return block.timestamp >= deadline;
    }
    
    /**
     * @dev Get time remaining in seconds
     */
    function getTimeRemaining() public view returns (uint256) {
        if (block.timestamp >= deadline) {
            return 0;
        }
        return deadline - block.timestamp;
    }
    
    /**
     * @dev Get campaign progress percentage (0-100)
     */
    function getProgress() public view returns (uint256) {
        if (goalAmount == 0) return 0;
        uint256 progress = (totalFundsRaised * 100) / goalAmount;
        return progress > 100 ? 100 : progress;
    }
    
    /**
     * @dev Get total number of contributors
     */
    function getContributorCount() public view returns (uint256) {
        return contributors.length;
    }
    
    /**
     * @dev Get contribution amount for a specific address
     */
    function getContribution(address contributor) public view returns (uint256) {
        return contributions[contributor];
    }
    
    /**
     * @dev Get all contributors (use with caution for large arrays)
     */
    function getAllContributors() public view returns (address[] memory) {
        return contributors;
    }
    
    /**
     * @dev Update minimum contribution (owner only)
     */
    function setMinContribution(uint256 _minContribution) external {
        require(msg.sender == owner, "Only owner can update");
        minContribution = _minContribution;
    }
    
    /**
     * @dev Emergency cancel campaign (owner only, before deadline)
     */
    function cancelCampaign() external {
        require(msg.sender == owner, "Only owner can cancel");
        require(campaignActive, "Campaign already inactive");
        
        campaignActive = false;
        
        emit CampaignFailed(totalFundsRaised);
    }
    
    /**
     * @dev Receive function to accept direct transfers
     */
    receive() external payable {
        require(campaignActive, "Campaign is not active");
        require(block.timestamp < deadline, "Campaign has ended");
        
        if (contributions[msg.sender] == 0) {
            contributors.push(msg.sender);
        }
        
        contributions[msg.sender] += msg.value;
        totalFundsRaised += msg.value;
        
        emit ContributionReceived(msg.sender, msg.value);
    }
}
