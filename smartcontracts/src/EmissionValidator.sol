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
        require(address(carbonCreditToken) != address(0), "CarbonCredit address is not set");
        _;
    }

    function submitRequest(string memory _jsonHash) public whenNotPaused {
        requests[requestCounter] = Request(msg.sender, Status.Pending, 0, _jsonHash);
        emit RequestSubmitted(requestCounter, msg.sender);
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

    function getRequests(uint256 _requestId) public view returns (Request memory) {
        return requests[_requestId];
    }

    function getHowManyRequests() public view returns (uint256) {
        return requestCounter;
    }

    function getCarbonCreditAddress() public view returns (address) {
        if(address(carbonCreditToken) == address(0)) {
            revert("CarbonCredit address is not set");
        }
        return address(carbonCreditToken);
    }

    function getCarbonCreditToken() public view returns (CarbonCredit) {
        return carbonCreditToken;
    }

    function isValidator(address _validator) public view returns (bool) {
        return validators[_validator];
    }

    function setCarbonCreditAddress(address _carbonCreditAddress) public onlyOwner {
        carbonCreditToken = CarbonCredit(_carbonCreditAddress);
    }

    function getCarbonCreditBalance() public view returns (uint256) {
        return carbonCreditToken.balanceOf(address(this));
    }

    receive() external payable {
        carbonCreditToken.transfer(address(this), msg.value);
    }
}
