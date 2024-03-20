// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
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
        console2.log("Carbon credit address: ", address(ev));
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

}
