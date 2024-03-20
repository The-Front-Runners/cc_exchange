// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {CarbonCredit} from "../src/CarbonCredit.sol";
import {DeployCarbonCredit} from "../script/DeployCarbonCredit.s.sol";

contract CarbonCreditTest is Test {
    CarbonCredit cc;
    DeployCarbonCredit deploy;
    address public USER1 = address(0x01);
    address public USER2 = address(0x02);

    function setUp() public {
        deploy = new DeployCarbonCredit();
        cc = deploy.run();
        console2.log("Carbon credit address: ", address(cc));
    }

    function testTotalSupply() public view {
        assertEq(cc.totalSupply(), 1000000 * 10 ** cc.decimals());
    }

    function testMint() public {
        vm.prank(cc.getOwner());    
        cc.mint(address(this), 1000);
        assertEq(cc.balanceOf(address(this)), 1000);
    }
    function testMintRevertsIfNotOwner() public {
        vm.expectRevert();
        cc.mint(USER1, 1000);
    }

    function testInitialSupplyToOwner() public view {
        assertEq(cc.balanceOf(cc.getOwner()), 1000000 * 10 ** cc.decimals());
    }
}
