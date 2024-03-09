export const randomContractAbi = [
  { inputs: [{ internalType: "string", name: "initMessage", type: "string" }], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "message", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
  {
    inputs: [{ internalType: "string", name: "newMessage", type: "string" }],
    name: "update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;


export const GoalAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "stakeAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "goalId",
        "type": "uint256"
      }
    ],
    "name": "GoalClaimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "goalId",
        "type": "uint256"
      }
    ],
    "name": "GoalCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "target",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "stakeAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "updates",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "goalId",
        "type": "uint256"
      }
    ],
    "name": "GoalCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "updatesRemaining",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "goalId",
        "type": "uint256"
      }
    ],
    "name": "GoalUpdates",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_goalId",
        "type": "uint256"
      }
    ],
    "name": "claimStake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_target",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_stakeAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_updates",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_deadline",
        "type": "uint256"
      }
    ],
    "name": "createGoal",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "goalCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "goals",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "target",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "stakeAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "updates",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "updatesRemaining",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "completed",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "claimed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_goalId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_videoHash",
        "type": "string"
      }
    ],
    "name": "updateGoal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;