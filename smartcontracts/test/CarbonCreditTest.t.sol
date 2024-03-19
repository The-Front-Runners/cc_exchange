// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {CarbonCredit} from "../src/CarbonCredit.sol";
import {DeployCarbonCredit} from "../script/DeployCarbonCredit.s.sol";

contract CarbonCreditTest is Test {
    CarbonCredit cc;
    DeployCarbonCredit deploy;

    function setUp() public {
        deploy = new DeployCarbonCredit();
        cc = deploy.run();
        console2.log("Carbon credit address: ", address(cc));
    }

    function testTotalSupply() public view {
        assertEq(cc.totalSupply(), 1000000 * 10 ** cc.decimals());
    }

    function testFuzz_SetNumber(uint256 x) public {
    }
}
