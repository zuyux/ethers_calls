import { ethers } from "ethers"; 
import { config } from 'dotenv';

config();

const INFURA_ID = process.env.INFURA_ID;
if (!INFURA_ID) {
    throw new Error("Please set the INFURA_ID in your .env file.");
}

// Initialize provider
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

// Ethereum address to check balance for
const address = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e';

const main = async () => {
    try {
        console.log("Fetching balance...");

        // Fetch the balance (in wei) and convert it to ETH
        const balance = await provider.getBalance(address);
        const formattedBalance = ethers.utils.formatEther(balance);

        console.log(`
===============================================
Address: ${address}
ETH Balance: ${formattedBalance} ETH
===============================================
        `);
    } catch (error) {
        console.error("Error fetching balance:", error.message);
    }
};

main();
