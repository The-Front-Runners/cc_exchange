"""
Automation for update debug section in front-end
"""
from dataclasses import dataclass, field
from json import dumps, load
from typing import List
import os
import shutil 

import argparse

# Parse command line arguments
parser = argparse.ArgumentParser(description='Deploy contracts and update frontend interface.')
parser.add_argument('--contract', type=str, help='Name of the contract to deploy', required=True)
args = parser.parse_args()

@dataclass
class Contract:
    """
    # Contract must have:
    - contractAddress: str
    - contractName: str
    - abi: list
    """

    name: str
    address: str
    abi: list = field(default_factory=list)

CHAIN_ID = 31337
CONTRACT_SCRIPT_NAME = f"Deploy{args.contract}.s.sol"
TRANSACTIONS_PATH = f"broadcast/{CONTRACT_SCRIPT_NAME}/{CHAIN_ID}/run-latest.json"
TARGET_DIR = "../smartcontract_interface/generated/deployedContracts.ts"
UI_TARGET_DIR = "../ui/generated"  

def abi_path(name) -> str:
    return f"out/{name}.sol/{name}.json"


os.makedirs(UI_TARGET_DIR, exist_ok=True)

with open(TRANSACTIONS_PATH) as deployed_contracts:
    json_file = load(deployed_contracts)
    transactions = json_file["transactions"]
    contracts: List[Contract] = []

    for contract in transactions:
        if contract["transactionType"] == "CREATE":
            name, address = contract["contractName"], contract["contractAddress"]
            contract_abi_path = abi_path(name)
            with open(contract_abi_path) as full_abi_json:
                abi = load(full_abi_json)["abi"]
                contracts.append(Contract(name, address, abi))

                
                ui_target_path = os.path.join(UI_TARGET_DIR, f"{name}.json")
                shutil.copy(contract_abi_path, ui_target_path)

json_config = {
    CHAIN_ID: [{"name": "localhost", "chainId": str(CHAIN_ID), "contracts": {}}]
}

for contract in contracts:
    json_config[CHAIN_ID][0]["contracts"][contract.name] = {
        "address": contract.address,
        "abi": contract.abi,
    }

os.makedirs('../smartcontract_interface/generated', exist_ok=True)

typescript_content = f"const deployedContracts = {dumps(json_config)} as const; \n\n export default deployedContracts"

with open(TARGET_DIR, "w") as ts_file:
    ts_file.write(typescript_content)
