// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {EmissionValidator} from "../src/EmissionValidator.sol";
 
contract DeployEmissionValidator is Script {

    function run() public returns (EmissionValidator) {
        console2.log("Deploying EmissionValidator");
        console2.log("Owner: ", msg.sender);
        vm.startBroadcast();
        EmissionValidator ev = new EmissionValidator();
        vm.stopBroadcast();
        return ev;
    }
}
