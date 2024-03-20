// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { CarbonCredit } from "./CarbonCredit.sol";

contract CarbonCreditApproval is Ownable, Pausable {
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

    constructor(address initialOwner) Ownable(initialOwner) {
        carbonCreditToken = new CarbonCredit();
    }

    function submitRequest(string memory _jsonHash) public whenNotPaused {
        requests[requestCounter] = Request(msg.sender, Status.Pending, 0);
        emit RequestSubmitted(requestCounter, msg.sender);
        requestCounter++;
    }

    function validateRequest(uint256 _requestId, Status _status, uint256 _amount) public whenNotPaused {
        require(validators[msg.sender], "Caller is not a validator");
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

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
