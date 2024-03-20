source .env

forge script script/DeployEmissionValidator.s.sol:DeployEmissionValidator \
    --private-key $OP_SEPOLIA_PRIVATE_KEY \
    --rpc-url $OP_SEPOLIA_RPC_URL \
    --broadcast
