// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {EmissionValidator} from "../src/EmissionValidator.sol";
import {DeployEmissionValidator} from "../script/DeployEmissionValidator.s.sol";

contract EmissionValidatorTest is Test {
    EmissionValidator ev;
    DeployEmissionValidator deploy;
    address public VALIDATOR = makeAddr("validator");
    address public COMPANY = makeAddr("company");
    address public CARBON_CREDIT = makeAddr("carbonCredit");

    function setUp() public {
        deploy = new DeployEmissionValidator();
        ev = deploy.run();
        console2.log("EmissionValidator address: ", address(ev));
        vm.deal(VALIDATOR, 1000 ether);
    }

    function testIfIsPausedOnDeploy() public view {
        assertEq(ev.isPaused(), false);
    }

    function testIfContractStartsWithNoRequest () public view {
        assertEq(ev.requestCounter(), 0);
    }

    function testIfOnlyOwnerCanAddValidator() public {
        vm.prank(ev.getOwner());
        ev.addValidator(VALIDATOR);
        assertEq(ev.validators(VALIDATOR), true);
    }

    function testRevertsIfNotOwnerTryAddingValidator() public {
        vm.expectRevert();
        vm.prank(COMPANY);
        ev.addValidator(VALIDATOR);
    }

    function testIfRequestIsSubmitted() public {
        vm.prank(COMPANY);
        ev.submitRequest("jsonHash");
        assertEq(ev.requestCounter(), 1);
        EmissionValidator.Request memory request = ev.getRequests(0);
        assertEq(uint256(request.status), uint256(EmissionValidator.Status.Pending));
    }

    function testIfOwnerIsMsgSender() public view{
        assertEq(ev.getOwner(), msg.sender);
    }
    function testIfDefaultCarbonCreditAddressIsZero() public view {
        assertEq(address(ev.carbonCreditToken()), address(0));
    }
    function testSetCarbonCreditAddressRevertsIfNotOwner() public {
        vm.prank(COMPANY);
        vm.expectRevert();
        ev.setCarbonCreditAddress(VALIDATOR);
    }
    function testSetCarbonCreditAddress() public {
        vm.prank(ev.getOwner());
        ev.setCarbonCreditAddress(CARBON_CREDIT);
        assertEq(address(ev.carbonCreditToken()), CARBON_CREDIT);
    }
    function testIfRequestIsSubmittedAndValidated() companySubmitedRequest public {
        EmissionValidator.Request memory request;
        vm.prank(ev.getOwner());
        ev.addValidator(VALIDATOR);
        vm.prank(VALIDATOR);
        ev.validateRequest(0, EmissionValidator.Status.Approved, 1000 ether);

        request = ev.getRequests(0);
        assertEq(uint256(request.status), uint256(EmissionValidator.Status.Approved));
    }

    modifier companySubmitedRequest() {
        vm.prank(COMPANY);
        ev.submitRequest("jsonHash");
        _;
    }

    modifier addValidator() {
        vm.prank(ev.getOwner());
        ev.addValidator(VALIDATOR);
        _;
    }

    modifier removeValidator() {
        vm.prank(ev.getOwner());
        ev.removeValidator(VALIDATOR);
        _;
    }

    modifier approveRequestWith1000Ether() {
        vm.prank(VALIDATOR);
        ev.validateRequest(0, EmissionValidator.Status.Approved, 1000 ether);
        _;
    }

    function testIfRemovedValidatorCantValidateRequest() companySubmitedRequest addValidator removeValidator public {
        vm.prank(VALIDATOR);
        vm.expectRevert();
        ev.validateRequest(0, EmissionValidator.Status.Approved, 1000 ether);
    }

    function testAmountIsUpdatedWhenRequestIsValidated() companySubmitedRequest addValidator public {
        vm.prank(VALIDATOR);
        ev.validateRequest(0, EmissionValidator.Status.Approved, 1000 ether);
        EmissionValidator.Request memory request = ev.getRequests(0);
        assertEq(request.amount, 1000 ether);
    }

    function testChangeStatusToRejectedIfRequestIsRejected() companySubmitedRequest addValidator public {
        vm.prank(VALIDATOR);
        ev.validateRequest(0, EmissionValidator.Status.Rejected, 1000 ether);
        EmissionValidator.Request memory request = ev.getRequests(0);
        assertEq(uint256(request.status), uint256(EmissionValidator.Status.Rejected));
    }

    function testIfCanClaimWithStatusRejected() companySubmitedRequest addValidator public {
        vm.prank(VALIDATOR);
        ev.validateRequest(0, EmissionValidator.Status.Rejected, 1000 ether);

        vm.expectRevert();
        ev.claimTokens(0);
    }   

    function testIfCanClaimWithRequestPending() companySubmitedRequest addValidator public {
        vm.expectRevert();
        ev.claimTokens(0);
    }

    function testIfCanClaimWithRequestApproved() companySubmitedRequest addValidator approveRequestWith1000Ether public {
        assertEq(ev.carbonCreditToken().balanceOf(COMPANY), 1000 ether);
    }

    function testIfCanClaimOnlyOnce() companySubmitedRequest addValidator approveRequestWith1000Ether public {
        vm.prank(COMPANY);
        ev.claimTokens(0);

        vm.prank(COMPANY); 
        vm.expectRevert();
        ev.claimTokens(0);
    }
}
