// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {CarbonCredit} from "../src/CarbonCredit.sol";
 
contract DeployCarbonCredit is Script {
    address owner = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

    function run() public returns (CarbonCredit) {
        console2.log("Deploying CarbonCredit");
        console2.log("Owner: ", owner);
        vm.startBroadcast();
        CarbonCredit cc = new CarbonCredit(owner);
        vm.stopBroadcast();
        return cc;
    }
}
