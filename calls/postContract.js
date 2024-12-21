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

// Account and private key
const account1 = process.env.ACCOUNT1; // Sender address
const account2 = process.env.ACCOUNT2; // Receiver address
const privateKey1 = process.env.PRIVATE_KEY1; // Private key of sender

if (!account1 || !account2 || !privateKey1) {
    throw new Error("Please set ACCOUNT1, ACCOUNT2, and PRIVATE_KEY1 in your .env file.");
}

// Wallet instance connected to provider
const wallet = new ethers.Wallet(privateKey1, provider);

// ERC20 ABI
const ERC20_ABI = [
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
];

// ERC20 contract address
const contractAddress = process.env.ERC20_CONTRACT;
if (!contractAddress) {
    throw new Error("Please set the ERC20_CONTRACT in your .env file.");
}

const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);

const main = async () => {
    try {
        console.log(`\nReading balances from contract at address: ${contractAddress}\n`);

        // Fetch balance of sender
        const balance = await contract.balanceOf(account1);
        console.log(`Balance of sender (before transfer): ${ethers.formatUnits(balance, 18)}\n`);

        if (balance.isZero()) {
            throw new Error("Insufficient balance to perform transfer.");
        }

        // Connect wallet to contract
        const contractWithWallet = contract.connect(wallet);

        // Transfer entire balance to receiver
        console.log(`Transferring ${ethers.formatUnits(balance, 18)} tokens from ${account1} to ${account2}...\n`);
        const tx = await contractWithWallet.transfer(account2, balance);
        await tx.wait();

        console.log("Transaction successful!");
        console.log(`Transaction Hash: ${tx.hash}\n`);

        // Fetch updated balances
        const balanceOfSender = await contract.balanceOf(account1);
        const balanceOfReceiver = await contract.balanceOf(account2);

        console.log(`
===============================================
Final Balances:
- Balance of sender: ${ethers.formatUnits(balanceOfSender, 18)}
- Balance of receiver: ${ethers.formatUnits(balanceOfReceiver, 18)}
===============================================
        `);
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
};

main();
