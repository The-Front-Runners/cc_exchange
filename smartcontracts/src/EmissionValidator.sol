// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { CarbonCredit } from "./CarbonCredit.sol";


contract EmissionValidator is Ownable, Pausable {
    using SafeERC20 for CarbonCredit;

    enum Status { Pending, Approved, Rejected, Claimed }

    struct Request {
        address requester;
        Status status;
        uint256 amount;
        string jsonHash;
    }

    mapping(uint256 => Request) private requests;
    mapping(address => bool) private validators;
    mapping(address => uint256[]) private requestsByAddress;

    CarbonCredit private carbonCreditToken;

    uint256 public requestCounter;

    event RequestSubmitted(uint256 requestId, address requester);
    event RequestValidated(uint256 requestId, Status status, uint256 amount);
    event TokensClaimed(uint256 _requestId, address requester, uint256 amount);

    constructor() Ownable(msg.sender) {
    }

    modifier onlyValidator() {
        require(validators[msg.sender], "Caller is not a validator");
        _;
    }

    modifier whenCarbonCreditSet() {
        require(address(carbonCreditToken) != address(0), "CarbonCredit token is not set");
        _;
    }

    function submitRequest(string memory _jsonHash) public whenNotPaused {
        uint256 requestId = requestCounter;
        requests[requestId] = Request(msg.sender, Status.Pending, 0, _jsonHash);
        requestsByAddress[msg.sender].push(requestId);
        emit RequestSubmitted(requestId, msg.sender);
        requestCounter++;
    }

    function validateRequest(uint256 _requestId, Status _status, uint256 _amount) public whenNotPaused onlyValidator {
        require(requests[_requestId].status == Status.Pending, "Request is not pending");

        requests[_requestId].status = _status;
        requests[_requestId].amount = _amount;

        emit RequestValidated(_requestId, _status, _amount);
    }

    function claimTokens(uint256 _requestId) public whenNotPaused whenCarbonCreditSet {
        require(requests[_requestId].status == Status.Approved, "Request is not approved");
        require(requests[_requestId].requester == msg.sender, "Caller is not the requester");
        require(requests[_requestId].amount > 0, "No tokens to claim");
        require(carbonCreditToken.balanceOf(address(this)) >= requests[_requestId].amount, "Not enough tokens to claim");

        uint256 amount = requests[_requestId].amount;
        require(amount > 0, "No tokens to claim");

        requests[_requestId].amount = 0;
        carbonCreditToken.transfer(msg.sender, amount);

        requests[_requestId].status = Status.Claimed;

        emit TokensClaimed(_requestId, msg.sender, amount);
    }

    function fundWithCarbonCredits(uint256 _amount) public whenNotPaused whenCarbonCreditSet onlyOwner {
        require(carbonCreditToken.allowance(msg.sender, address(this)) >= _amount, "Not enough allowance");
        require(carbonCreditToken.balanceOf(msg.sender) >= _amount, "Not enough tokens to transfer");
        carbonCreditToken.safeTransferFrom(msg.sender, address(this), _amount);
    }

    function addValidator(address _validator) public onlyOwner {
        validators[_validator] = true;
    }

    function removeValidator(address _validator) public onlyOwner {
        validators[_validator] = false;
    }

    function isPaused() public view returns (bool) {
        return paused();
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Getters
     */

    function getRequests(uint256 _requestId) public view returns (Request memory) {
        return requests[_requestId];
    }

    function getHowManyRequests() public view returns (uint256) {
        return requestCounter;
    }

    function getCarbonCreditAddress() public view whenCarbonCreditSet returns (address) {
        return address(carbonCreditToken);
    }

    function getCarbonCreditToken() public view whenCarbonCreditSet returns (CarbonCredit) {
        return carbonCreditToken;
    }

    function getCarbonCreditBalance() public view whenCarbonCreditSet returns (uint256)  {
        return carbonCreditToken.balanceOf(address(this));
    }

    function getRequestsByAddress(address _address) public view returns (uint256[] memory) {
        return requestsByAddress[_address];
    }

    function isValidator(address _validator) public view returns (bool) {
        return validators[_validator];
    }

    /**
     * @dev Setters
     */

    function setCarbonCreditAddress(address _carbonCreditAddress) public onlyOwner {
        carbonCreditToken = _carbonCreditAddress != address(0) ? CarbonCredit(_carbonCreditAddress) : CarbonCredit(_carbonCreditAddress);
    }

    /**
     * @dev Fallback function
     */

    receive() external payable {
        carbonCreditToken.transfer(address(this), msg.value);
    }
}
