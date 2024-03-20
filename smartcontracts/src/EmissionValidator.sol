// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import { CarbonCredit } from "./CarbonCredit.sol";

contract EmissionValidator is Ownable, Pausable {
    enum Status { Pending, Approved, Rejected }

    struct Request {
        address requester;
        Status status;
        uint256 amount;
    }

    mapping(uint256 => Request) public requests;
    mapping(address => bool) public validators;
    CarbonCredit public carbonCreditToken;

    uint256 public requestCounter;

    event RequestSubmitted(uint256 requestId, address requester);
    event RequestValidated(uint256 requestId, Status status, uint256 amount);

    constructor() Ownable(msg.sender) {
    }

    modifier onlyValidator() {
        require(validators[msg.sender], "Caller is not a validator");
        _;
    }

    function submitRequest(string memory _jsonHash) public whenNotPaused {
        requests[requestCounter] = Request(msg.sender, Status.Pending, 0);
        emit RequestSubmitted(requestCounter, msg.sender);
        requestCounter++;
    }

    function validateRequest(uint256 _requestId, Status _status, uint256 _amount) public whenNotPaused onlyValidator {
        require(requests[_requestId].status == Status.Pending, "Request is not pending");

        requests[_requestId].status = _status;
        requests[_requestId].amount = _amount;

        if (_status == Status.Approved) {
            carbonCreditToken.transfer(requests[_requestId].requester, _amount);
        }

        emit RequestValidated(_requestId, _status, _amount);
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
        return address(carbonCreditToken);
    }

    function getValidatorStatus(address _validator) public view returns (bool) {
        return validators[_validator];
    }

    function getOwner() public view returns (address) {
        return owner();
    }

    function setCarbonCreditAddress(address _carbonCreditAddress) public onlyOwner {
        carbonCreditToken = CarbonCredit(_carbonCreditAddress);
    }

}
