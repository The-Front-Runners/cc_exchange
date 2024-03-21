// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {CarbonCredit} from "../src/CarbonCredit.sol";

contract DeployCarbonCredit is Script {
    function run() public returns (CarbonCredit) {
        console2.log("Deploying CarbonCredit");
        console2.log("Owner: ", msg.sender);
        vm.startBroadcast();
        CarbonCredit cc = new CarbonCredit();
        vm.stopBroadcast();
        return cc;
    }
}
