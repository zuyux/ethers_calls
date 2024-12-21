# Ethers RPC Samples
Learn how to interact with Ethereum using Ethers.js through these simplified and modular examples.

## Technology Stack & Tools

- **ES Modules**: Modern JavaScript syntax for improved readability and maintainability.
- **[Ethers.js](https://docs.ethers.io/v6/)**: A powerful library for blockchain interaction.
- **[Node.js](https://nodejs.org/en/)**: For running scripts and managing dependencies.
- **[Infura](https://infura.io/)**: A node provider for Ethereum blockchain access.

---

## Setting Up
### 1. Clone or Download the Repository:
```bash
$ git clone <repository-link>
$ cd <repository-folder>
```

### 2. Install Dependencies:
```bash
$ npm install
```

### 3. Environment Variables:
Create a `.env` file in the root directory and include the following details:
```env
INFURA_ID=your_infura_project_id
ACCOUNT1=your_account1_address
ACCOUNT2=your_account2_address
PRIVATE_KEY1=your_account1_private_key
ERC20_CONTRACT=your_erc20_contract_address
```

---

## ETH RPC Scripts

### 1. **accounts.js**: Read ETH balance of a wallet address.
- Ensures readability by formatting Ether balance in human-readable units.
- Uses ES Modules to load dependencies.
```bash
$ node calls/getAccount.js
```

---

### 2. **read_smart_contract.js**: Fetches the balance of a wallet address from a smart contract (e.g., DAI contract).
- Demonstrates how to interact with ERC20 contracts using Ethers.js.
```bash
$ node calls/getContract.js
```

---

### 3. **send_signed_transaction.js**: Transfers 0.025 ETH from one account to another.
- Includes detailed logging of sender and receiver balances before and after the transaction.
- Uses `.env` for securely managing private keys.
```bash
$ node calls/postTX.js
```

---

### 4. **write_contract.js**: Transfers the entire balance of an ERC20 token from one account to another.
- Shows how to connect a wallet to an ERC20 contract and send tokens securely.
```bash
$ node calls/postContract.js
```

---

### 5. **contract_event_stream.js**: Queries blocks for `Transfer` events.
- Streams real-time blockchain data using Ethers.js’s event querying API.
```bash
$ node calls/getStream.js
```

---

### 6. **inspecting_blocks.js**: Fetches transactions from a specific block.
- Extracts detailed transaction data for inspection and logging.
```bash
$ node calls/getBlocks.js
```
