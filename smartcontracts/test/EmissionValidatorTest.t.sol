// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {EmissionValidator} from "../src/EmissionValidator.sol";
import {DeployEmissionValidator} from "../script/DeployEmissionValidator.s.sol";

contract EmissionValidatorTest is Test {
    EmissionValidator ev;
    DeployEmissionValidator deploy;

    function setUp() public {
        deploy = new DeployEmissionValidator();
        ev = deploy.run();
        console2.log("Carbon credit address: ", address(ev));
    }

    function testIfIsPausedOnDeploy() public view {
        assertEq(ev.isPaused(), false);
    }

    function testFuzz_SetNumber(uint256 x) public {
    }
}
