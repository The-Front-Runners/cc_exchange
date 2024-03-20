"""
Automation for update debug section in front-end
"""
from dataclasses import dataclass, field
from json import dumps, load
from typing import List
import os


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
CONTRACT_SCRIPT_NAME = "DeployEmissionValidator.s.sol"
TRANSACTIONS_PATH = f"broadcast/{CONTRACT_SCRIPT_NAME}/{CHAIN_ID}/run-latest.json"
TARGET_DIR = "../smartcontract_interface/generated/deployedContracts.ts"



def abi_path(name) -> str:
    return f"out/{name}.sol/{name}.json"


with open(TRANSACTIONS_PATH) as deployed_contracts:
    json_file = load(deployed_contracts)
    transactions = json_file["transactions"]
    contracts: List[Contract] = []

    for contract in transactions:
        if contract["transactionType"] == "CREATE":
            name, address = contract["contractName"], contract["contractAddress"]
            with open(abi_path(name)) as full_abi_json:
                abi = load(full_abi_json)["abi"]
                contracts.append(Contract(name, address, abi))


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
