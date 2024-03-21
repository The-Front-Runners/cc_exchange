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

    /**
     * @dev Modifiers
     */

    modifier addValidator() {
            vm.prank(ev.owner());
            ev.addValidator(VALIDATOR);
            _;
        }

    modifier removeValidator() {
        vm.prank(ev.owner());
        ev.removeValidator(VALIDATOR);
        _;
    }

    modifier approveRequestWith1000Ether() {
        vm.prank(VALIDATOR);
        ev.validateRequest(0, EmissionValidator.Status.Approved, 1000 ether);
        _;
    }
    
     modifier companySubmitedRequest() {
        vm.prank(COMPANY);
        ev.submitRequest("jsonHash");
        _;
    }

    /**
     * @dev General tests
     */

    function testIfIsPausedOnDeploy() public view {
        assertEq(ev.isPaused(), false);
    }

    function testIfContractStartsWithNoRequest () public view {
        assertEq(ev.requestCounter(), 0);
    }

    function testIfOnlyOwnerCanAddValidator() public {
        vm.prank(ev.owner());
        ev.addValidator(VALIDATOR);
        assertEq(ev.isValidator(VALIDATOR), true);
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
        assertEq(ev.owner(), msg.sender);
    }
    
    function testSetCarbonCreditAddressRevertsIfNotOwner() public {
        vm.prank(COMPANY);
        vm.expectRevert();
        ev.setCarbonCreditAddress(VALIDATOR);
    }
    function testSetCarbonCreditAddress() public {
        vm.prank(ev.owner());
        ev.setCarbonCreditAddress(CARBON_CREDIT);
        assertEq(address(ev.getCarbonCreditAddress()), CARBON_CREDIT);
    }
    function testIfRequestIsSubmittedAndValidated() companySubmitedRequest public {
        EmissionValidator.Request memory request;
        vm.prank(ev.owner());
        ev.addValidator(VALIDATOR);
        vm.prank(VALIDATOR);
        ev.validateRequest(0, EmissionValidator.Status.Approved, 1000 ether);

        request = ev.getRequests(0);
        assertEq(uint256(request.status), uint256(EmissionValidator.Status.Approved));
    }

   

    /**
     * @dev Validation tests
     */

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

     function testIfIsValidator() public {
        assertEq(ev.isValidator(VALIDATOR), false);
        vm.prank(ev.owner());
        ev.addValidator(VALIDATOR);
        assertEq(ev.isValidator(VALIDATOR), true);
    }
    /**
     * @dev Carbon credit token tests
     */
    function testIfRevertsIfCarbonCreditNotSet() public {
        vm.expectRevert();
        ev.getCarbonCreditAddress();
    }

    /**
     * @dev Claim tests
     */
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
        assertEq(ev.getCarbonCreditToken().balanceOf(COMPANY), 1000 ether);
    }

// 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
    // function testFundContractWithCarbonCreditTokens() public {
    //     vm.deal(CARBON_CREDIT, 1000 ether);
    //     vm.prank(ev.owner());
    //     ev.setCarbonCreditAddress(CARBON_CREDIT);
    //     assertEq(ev.getCarbonCreditToken().balanceOf(address(ev)), 1000 ether);
    // }

    // function testClaimsSucceded() companySubmitedRequest addValidator approveRequestWith1000Ether public {
    //     vm.prank(COMPANY);
    //     ev.claimTokens(0);
    //     assertEq(ev.getCarbonCreditToken().balanceOf(COMPANY), 1000);
    // }

    // function testIfCanClaimOnlyOnce() companySubmitedRequest addValidator approveRequestWith1000Ether public {
    //     vm.prank(COMPANY);
    //     ev.claimTokens(0);

    //     vm.prank(COMPANY); 
    //     vm.expectRevert();
    //     ev.claimTokens(0);
    // }

    // function testIfStatusIsClaimedAfterClaiming() companySubmitedRequest addValidator approveRequestWith1000Ether public {
    //     vm.prank(COMPANY);
    //     ev.claimTokens(0);
    //     EmissionValidator.Request memory request = ev.getRequests(0);
    //     assertEq(uint256(request.status), uint256(EmissionValidator.Status.Claimed));
    // }
}
