async function main() {
    const L1ToL2Messenger = await ethers.getContractFactory("L1ToL2Messenger");

    // Deploy the contract, passing in the StarkNet Core contract address and your L2 contract address.
    const l1ToL2Messenger = await L1ToL2Messenger.deploy(
        "0xE2Bb56ee936fd6433DC0F6e7e3b8365C906AA057" // StarkNet Core Contract address on Sepolia
    );

    console.log("L1 to L2 Messenger deployed to:", l1ToL2Messenger.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
