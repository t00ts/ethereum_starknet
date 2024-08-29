const { ethers } = require("ethers");

// Ethereum network
const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_NETWORK);

// Ethereum wallet
const privateKey = process.env.ETHEREUM_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

// Starknet (L2) deployed contract address
const l2ContractAddress = "0x000f25751cdcf8cbc875befe5fde1a13c07dddf8bca4d52b93c30f09e925bfec";

// Ethereum (L1) deployed contract address
const contractAddress = "0x15A9E9f641056775295BF73805d0Be06702EeCbb";

// Contract ABI
const contractArtifact = require('../artifacts/contracts/L1ToL2Messenger.sol/L1ToL2Messenger.json');
const contractABI = contractArtifact.abi;

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);


async function callContract() {

    // Identifies the L2 contract method to call
    // Calculate it with `starkli selector <L2_METHOD_NAME>`
    const selector = "0x00627939a4136b995392984b436eac9b919aad5936b306b7eee61d0fac70dc95";

    // Example payload
    const payload = [Number(0x42069)];

    // Set a reasonable L1 → L2 message fee
    const l1MessageFee = ethers.parseUnits("0.001", "ether");

    try {
        // Send the transaction
        console.log("Sending tx: [", selector, ",", payload, "]");
        const tx = await contract.sendMessage(l2ContractAddress, selector, payload, {
            value: l1MessageFee,
            gasLimit: 300000
        });
        console.log("Transaction sent! Hash:", tx.hash);

        // Wait for the transaction to be confirmed
        const receipt = await tx.wait();
        console.log("Transaction confirmed! Block number:", receipt.blockNumber);
    } catch (error) {
        console.error("Error sending message to L2:", error);
    }

}

callContract()
