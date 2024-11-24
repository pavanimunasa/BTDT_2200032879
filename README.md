Electricity Bill Calculator DApp
This project is a simple Decentralized Application (DApp) for calculating electricity bills using Solidity, Ganache, MetaMask, and a user-friendly interface. The application collects electricity meter readings, calculates energy consumption, and generates the corresponding bill. It is designed to run locally using Ganache for blockchain simulation and integrates MetaMask for user authentication and transaction signing.

Prerequisites
Tools and Libraries
Ganache: A local blockchain simulator for Ethereum development.
MetaMask: A browser extension to manage Ethereum accounts and sign transactions.
Node.js: Required for running the backend and installing dependencies.
npm: Comes with Node.js for managing project dependencies.
Web3.js: A library to interact with the Ethereum blockchain from JavaScript.
Solidity: The programming language for smart contracts.
Installation and Setup
1. Install Required Tools
Ganache: Download and install from Ganache's website.
MetaMask: Add the MetaMask extension to your browser from MetaMask's website.
Node.js and npm: Download and install from Node.js website.
2. Clone the Repository
bash
Copy code
git clone <repository-url>
cd electricity-bill-dapp
3. Install Dependencies
bash
Copy code
npm install
Running the Application
Step 1: Start Ganache
Open Ganache and create a new workspace or use a quickstart workspace.
Note the RPC server URL (e.g., http://127.0.0.1:7545).
Step 2: Compile and Deploy the Smart Contract
Ensure Truffle or Hardhat is installed globally:
bash
Copy code
npm install -g truffle
Compile the contract:
bash
Copy code
truffle compile
Deploy the contract to Ganache:
bash
Copy code
truffle migrate
Step 3: Connect MetaMask to Ganache
Open MetaMask and import an account using a private key from Ganache.
Set the network to "Custom RPC" and input the RPC URL from Ganache.
Step 4: Start the Frontend
Run the local development server:
bash
Copy code
npm start
Open the DApp in your browser at http://localhost:3000.
Features
Meter Readings Input: Users can input the previous and current electricity meter readings.
Usage Calculation: Calculates energy consumption based on the readings.
Bill Generation: Generates the bill based on a predefined cost per unit.
Blockchain Transactions: All calculations and data are stored securely on the blockchain.
MetaMask Integration: Enables user authentication and transaction signing.
Project Structure
bash
Copy code
electricity-bill-dapp/
├── contracts/           # Solidity smart contracts
│   └── ElectricityBill.sol
├── migrations/          # Deployment scripts
├── src/                 # Frontend source code
│   ├── components/
│   ├── App.js
│   ├── index.js
├── truffle-config.js    # Truffle configuration file
├── package.json         # Project dependencies
└── README.md            # Project documentation
Example Usage
Open the DApp in your browser.
Connect MetaMask to the DApp.
Enter the previous and current meter readings.
Submit the transaction to calculate the bill.
View the bill generated and stored on the blockchain.
Future Enhancements
Support for dynamic billing rates.
Integration with real-world energy providers.
Addition of usage and payment history tracking.
Troubleshooting
Common Issues
MetaMask Not Connected:
Ensure MetaMask is connected to the same network as Ganache.
Transaction Fails:
Verify sufficient funds in the MetaMask account.
Ensure the smart contract is deployed successfully.
License
This project is licensed under the MIT License. See the LICENSE file for details.
