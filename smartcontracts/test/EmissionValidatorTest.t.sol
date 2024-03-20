// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {EmissionValidator} from "../src/EmissionValidator.sol";
import {DeployEmissionValidator} from "../script/DeployEmissionValidator.s.sol";

contract EmissionValidatorTest is Test {
    EmissionValidator ev;
    DeployEmissionValidator deploy;
    address public VALIDATOR = makeAddr("validator");

    function setUp() public {
        deploy = new DeployEmissionValidator();
        ev = deploy.run();
        console2.log("Carbon credit address: ", address(ev));
        vm.deal(VALIDATOR, 1000);
    }

    function testIfIsPausedOnDeploy() public view {
        assertEq(ev.isPaused(), false);
    }

    function testIfContractStartsWithNoRequest () public view {
        assertEq(ev.requestCounter(), 0);
    }

    function testIfRequestIsSubmitted() public {
        ev.submitRequest("jsonHash");
        assertEq(ev.requestCounter(), 1);
    }

    function testIfValidatorIsBeingAdded() public {
        ev.addValidator(VALIDATOR);
        assertEq(ev.validators(VALIDATOR), true);
    }

}
