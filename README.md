# Starknet Messaging Testbed

Sending messages from Ethereum to Starknet.


## Starknet Contract Deployment:

```sh
cd starknet/
```

### 1. Set up your Starknet account

Set the required Starknet environment variables in `starknet.env` and run:

```sh
source starknet.env
```

### 2. Build the Cairo contract

```sh
(cd store_value && scarb build)
```

### 3. Declare the Cairo contract in Starknet

In other words, you're sending your contract’s code to the network

```sh
starkli declare \
	store_value/target/dev/store_value_SimpleStorage.contract_class.json \
	--compiler-version=2.7.1 \
```

This will return the identifier of the contract class in Starknet:

```
Class hash declared:
0x0618a9355cb653ac5cc7eb0d4d88ad74fbbb30bff03357dc573641010aed4279
```

### 4. Deploy a contract instance to Starknet

You're now creating a usable instance of the code you previously declared

```sh
starkli deploy 0x0618a9355cb653ac5cc7eb0d4d88ad74fbbb30bff03357dc573641010aed4279
```

This will return the address of the deployed contract:

```
Contract deployed:
0x05d6d1ab1a3ce77fbf0e04eca3a17e908ef9825e86286dc3845c5e23bb82485c
```

## Ethereum Contract Deployment:

Install dependencies

```sh
cd ethereum/
pnpm i
```

Set the required Ethereum environment variables in `ethereum.env` and run:

```sh
source ethereum.env
```

### 1. Build the Solidity contract

Compile the Ethereum smart contract using `hardhat`

```sh
npx hardhat compile
```

### 2. Deploy the contract to Ethereum

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

This will return the Ethereum address of the deployed contract:

```
L1 to L2 Messenger deployed to: 0x76d4661bD8a04e5769bA196d91f5D33f5038cdBc
```

### 3. Call the Contract

Review the `callContract.js` script and update all variables accordingly. Once you're done, run it with:

```sh
node scripts/callContract.js
```


## Checking everything worked

You should now be able to call your L2 contract with `starkli` and check that `modified_by` has been updated to reflect your L1 contract address, and the stored value corresponds with what you sent:

```sh
starkli call <L2_CONTRACT_ADDRESS> get_modified_by

[
    "<LI_CONTRACT_ADDRESS>"
]
starkli call <L2_CONTRACT_ADDRESS> get

[
    "<NEW_VALUE>"
]
```
