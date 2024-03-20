//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Script } from "forge-std/Script.sol";
import { CarbonCredit } from "../src/CarbonCredit.sol";

contract HelperConfig is Script{

    struct NetworkConfig {
        address carbonCreditAddress;
    }

    uint256 public constant DEFAULT_ANVIL_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;

    NetworkConfig public activeNetworkConfig;

    constructor(){
        if(block.chainid == 31337){
            activeNetworkConfig = getOrCreateAnvilEthConfig();
        }
    }

    function getOrCreateAnvilEthConfig() public returns (NetworkConfig memory){
        vm.startBroadcast();
        CarbonCredit cc = new CarbonCredit();
        vm.stopBroadcast();

        NetworkConfig memory config = NetworkConfig({
            carbonCreditAddress: address(cc)
        });
        return config;
    }
}