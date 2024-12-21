import { ethers } from "ethers";
import { config } from "dotenv";

config();

const INFURA_ID = process.env.INFURA_ID;
if (!INFURA_ID) {
    throw new Error("Please set the INFURA_ID in your .env file.");
}

// Initialize provider
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

// ERC20 ABI
const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
];

// DAI contract address
const contractAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);

// Address to fetch balance for
const walletAddress = '0x6c6Bc977E13Df9b0de53b251522280BB72383700';

const main = async () => {
    try {
        console.log(`Fetching ERC20 token data from contract at address: ${contractAddress}...\n`);

        // Fetch token details
        const name = await contract.name();
        const symbol = await contract.symbol();
        const totalSupply = await contract.totalSupply();

        console.log(`
===============================================
Token Details:
- Name: ${name}
- Symbol: ${symbol}
- Total Supply: ${ethers.utils.formatUnits(totalSupply, 18)} ${symbol}
===============================================\n`);

        // Fetch balance
        console.log(`Fetching balance for address: ${walletAddress}...\n`);
        const balance = await contract.balanceOf(walletAddress);

        console.log(`
===============================================
Wallet Balance:
- Address: ${walletAddress}
- Raw Balance: ${balance}
- Formatted Balance: ${ethers.utils.formatUnits(balance, 18)} ${symbol}
===============================================\n`);
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
};

main();
