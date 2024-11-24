// Smart contract details
const contractAddress = "0x0e41e291b137f8aB7CdA342B03291D8d1DB9Ad20";
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_ratePerUnit",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "unitsUsed",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "billAmount",
                "type": "uint256"
            }
        ],
        "name": "BillGenerated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "bills",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "previousReading",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "currentReading",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "unitsUsed",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "billAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "ratePerUnit",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "previousReading",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "currentReading",
                "type": "uint256"
            }
        ],
        "name": "generateBill",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBill",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "previousReading",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentReading",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "unitsUsed",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "billAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ElectricityBill.Bill",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }
];

let web3;
let contract;

// Conversion rate: 1 Ether = INR_RATE Rupees
const INR_RATE = 85000; // Example conversion rate, adjust as needed

// Connect to MetaMask and initialize the contract
async function initializeWeb3() {
  if (window.ethereum) {
      try {
          // Request user to connect MetaMask
          await window.ethereum.request({ method: "eth_requestAccounts" });

          // Initialize Web3 instance with MetaMask provider
          web3 = new Web3(window.ethereum);

          // Create contract instance
          contract = new web3.eth.Contract(contractABI, contractAddress);
          console.log("Web3 initialized successfully", web3);

      } catch (error) {
          console.error("User denied account access or another error occurred", error);
          alert("Please enable MetaMask or check for any issues with the connection.");
      }
  } else {
      alert("Please install MetaMask to use this DApp!");
  }
}

// Call initializeWeb3 when the page loads
window.addEventListener("load", initializeWeb3);

// Generate bill function
window.generateBill = async function () {
  if (!web3 || !web3.eth) {
      alert("Web3 is not initialized. Please ensure MetaMask is connected.");
      return;
  }

  // Get user accounts from MetaMask
  const accounts = await web3.eth.getAccounts();
  const prevReading = document.getElementById("prevReading").value;
  const currReading = document.getElementById("currReading").value;

  // Ensure readings are valid
  if (!prevReading || !currReading || isNaN(prevReading) || isNaN(currReading)) {
      alert("Please enter valid numerical readings.");
      return;
  }

  try {
      // Call generateBill on the contract
      await contract.methods.generateBill(prevReading, currReading)
          .send({ from: accounts[0] });

      // Retrieve the bill details from the contract
      const bill = await contract.methods.getBill().call({ from: accounts[0] });

      const billInEther = parseFloat(web3.utils.fromWei(bill.billAmount.toString(), "ether"));
      const billInRupees = (billInEther * INR_RATE).toFixed(2);

      document.getElementById("billDetails").innerHTML = `
          Units Used: ${bill.unitsUsed}<br>
          Bill in Ether: ${billInEther.toFixed(10)} Ether<br>
          Bill in Rupees: ₹${billInRupees}
      `;
  } catch (error) {
      console.error("Error generating bill:", error);
      alert("Error generating bill. Please check the console for details.");
  }

  try {
    // Call generateBill on the contract with a higher gas limit
    await contract.methods.generateBill(prevReading, currReading)
        .send({ from: accounts[0], gas: 3000000 });

    // Retrieve the bill details from the contract
    const bill = await contract.methods.getBill().call({ from: accounts[0] });

    const billInEther = parseFloat(web3.utils.fromWei(bill.billAmount.toString(), "ether"));
    const billInRupees = (billInEther * INR_RATE).toFixed(2);

    document.getElementById("billDetails").innerHTML = `
        Units Used: ${bill.unitsUsed}<br>
        Bill in Ether: ${billInEther.toFixed(10)} Ether<br>
        Bill in Rupees: ₹${billInRupees}
    `;
} catch (error) {
    console.error("Error generating bill:", error);
    alert("Error generating bill. Please check the console for details.");
}

};