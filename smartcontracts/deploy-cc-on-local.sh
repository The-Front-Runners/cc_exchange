forge b --skip test script --build-info

forge script script/DeployCarbonCredit.s.sol:DeployCarbonCredit \
    --rpc-url http://127.0.0.1:8545 \
    --build-info \
    --broadcast \
    --verbosity \
    --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

python3 deployAny.py --contract CarbonCredit

