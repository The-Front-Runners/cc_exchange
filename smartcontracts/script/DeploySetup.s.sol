// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {EmissionValidator} from "../src/EmissionValidator.sol";
import {CarbonCredit} from "../src/CarbonCredit.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeploySetup is Script {
    function run() public returns (EmissionValidator, CarbonCredit){
        console2.log("Deploying EmissionValidator");
        console2.log("Owner: ", msg.sender);
        console2.log("Deploying CarbonCredit");
        // HelperConfig hc = new HelperConfig();
        // () = hc.activeNetworkConfig();

        vm.startBroadcast();
        EmissionValidator ev = new EmissionValidator();
        CarbonCredit cc = new CarbonCredit();
        vm.stopBroadcast();
        return (ev, cc);
    }
}
