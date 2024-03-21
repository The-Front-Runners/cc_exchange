// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Test, console2} from "forge-std/Test.sol";
import {EmissionValidator} from "../../src/EmissionValidator.sol";
import {DeployEmissionValidator} from "../../script/DeployEmissionValidator.s.sol";
import {CarbonCredit} from "../../src/CarbonCredit.sol";
import {DeployCarbonCredit} from "../../script/DeployCarbonCredit.s.sol";

contract EmissionValidatorIntegrationTest is Test {
    EmissionValidator ev;
    CarbonCredit cc;
    DeployEmissionValidator deployEmissionValidator;
    DeployCarbonCredit deployCarbonCredit;

    address public VALIDATOR = makeAddr("validator");
    address public COMPANY = makeAddr("company");
    address public CARBON_CREDIT_MOCK_ADDRESS = makeAddr("carbonCredit");
    address public EV_OWNER;
    address public CC_OWNER;

    function setUp() public {
        deployEmissionValidator = new DeployEmissionValidator();
        deployCarbonCredit = new DeployCarbonCredit();
        ev = deployEmissionValidator.run();
        cc = deployCarbonCredit.run();
        EV_OWNER = ev.owner();
        CC_OWNER = cc.getOwner();

        console2.log("EmissionValidator address: ", address(ev));
        console2.log("EmissionValidator owner address: ", EV_OWNER);
        console2.log("CarbonCredit address: ", address(cc));
        console2.log("CarbonCredit owner address: ", CC_OWNER);
    }

    function testRevertWhenNotEnoughTokensToClaim() public {
        vm.deal(COMPANY, 1000 ether);
        vm.deal(VALIDATOR, 1000 ether);
        vm.deal(address(ev), 1000 ether);
        vm.deal(address(cc), 1000 ether);

        vm.prank(EV_OWNER);
        ev.setCarbonCreditAddress(address(cc));

        vm.prank(COMPANY);
        ev.submitRequest("jsonHash");

        vm.prank(EV_OWNER);
        ev.addValidator(VALIDATOR);

        vm.prank(VALIDATOR);
        ev.validateRequest(0, EmissionValidator.Status.Approved, 1000 ether);

        vm.prank(COMPANY);
        vm.expectRevert("Not enough tokens to claim");
        ev.claimTokens(0);
    }

    function testEmissionValidatorFullInteraction() public {
        vm.deal(COMPANY, 1000 ether);
        vm.deal(VALIDATOR, 1000 ether);
        vm.deal(address(ev), 1000 ether);
        vm.deal(address(cc), 1000 ether);

        vm.prank(EV_OWNER);
        ev.setCarbonCreditAddress(address(cc));

        vm.prank(COMPANY);
        ev.submitRequest("jsonHash");

        vm.prank(EV_OWNER);
        ev.addValidator(VALIDATOR);

        vm.prank(VALIDATOR);
        ev.validateRequest(0, EmissionValidator.Status.Approved, 1000 ether);

        // approve cc owner to send tokens
        vm.prank(CC_OWNER);
        cc.approve(address(ev), 1000 ether);

        vm.prank(CC_OWNER);
        ev.fundWithCarbonCredits(1000 ether);

        vm.prank(COMPANY);
        ev.claimTokens(0);
        assertEq(cc.balanceOf(COMPANY), 1000 ether);
    }
}
