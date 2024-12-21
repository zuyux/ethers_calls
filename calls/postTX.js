import { ethers } from "ethers";
import { config } from "dotenv";

// Load environment variables
config();

const INFURA_ID = process.env.INFURA_ID;
if (!INFURA_ID) {
    throw new Error("Please set the INFURA_ID in your .env file.");
}

// Initialize provider
const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${INFURA_ID}`);

// Accounts and private key
const account1 = process.env.ACCOUNT1; // Sender address
const account2 = process.env.ACCOUNT2; // Receiver address
const privateKey1 = process.env.PRIVATE_KEY1; // Sender's private key

if (!account1 || !account2 || !privateKey1) {
    throw new Error("Please set ACCOUNT1, ACCOUNT2, and PRIVATE_KEY1 in your .env file.");
}

// Wallet instance connected to provider
const wallet = new ethers.Wallet(privateKey1, provider);

const main = async () => {
    try {
        console.log("\nFetching initial balances...\n");

        // Fetch balances before transaction
        const senderBalanceBefore = await provider.getBalance(account1);
        const receiverBalanceBefore = await provider.getBalance(account2);

        console.log(`Sender balance before: ${ethers.formatEther(senderBalanceBefore)} ETH`);
        console.log(`Receiver balance before: ${ethers.formatEther(receiverBalanceBefore)} ETH\n`);

        // Send transaction
        const amountToSend = "0.025"; // ETH to send
        console.log(`Sending ${amountToSend} ETH from ${account1} to ${account2}...\n`);
        const tx = await wallet.sendTransaction({
            to: account2,
            value: ethers.parseEther(amountToSend),
        });

        await tx.wait(); // Wait for the transaction to be mined
        console.log("Transaction successful!");
        console.log(`Transaction Hash: ${tx.hash}\n`);

        // Fetch balances after transaction
        const senderBalanceAfter = await provider.getBalance(account1);
        const receiverBalanceAfter = await provider.getBalance(account2);

        console.log(`
===============================================
Final Balances:
- Sender balance after: ${ethers.formatEther(senderBalanceAfter)} ETH
- Receiver balance after: ${ethers.formatEther(receiverBalanceAfter)} ETH
===============================================
        `);
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
};

main();
