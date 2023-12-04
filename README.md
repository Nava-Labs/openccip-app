# OpenCCIP

Additional Repositories: [OpenCCIP Smart Contracts](https://github.com/Nava-Labs/openccip-contracts) | [OpenCCIP SDK](https://github.com/Nava-Labs/openccip-sdk) | [OpenCCIP Subgraphs](https://github.com/Nava-Labs/openccip-subgraph)

## Overview

This application leverages the powerful capabilities of Chainlink CCIP and utilizes the [OpenCCIP SDK](https://github.com/Nava-Labs/openccip-sdk) to manage cross-chain transactions and interact with our [OpenCCIP Smart Contracts](https://github.com/Nava-Labs/openccip-contracts) like [CRC1](https://github.com/Nava-Labs/openccip-contracts/tree/dev#crc1), [CRC1Syncable](https://github.com/Nava-Labs/openccip-contracts/tree/dev#crc1syncable), [CRC20](https://github.com/Nava-Labs/openccip-contracts/tree/dev#crc20-source-and-destination), to create a seamless cross-chain NFT marketplace experience.

## Our Features

## Multichain Transactions by integrating OpenCCIP SDK

- Perform multichain transactions using the **hopThenExecute** function from the [OpenCCIP SDK](https://github.com/Nava-Labs/openccip-sdk).
- By utilize the **fetchBestRoutes** function from our [SDK](https://github.com/Nava-Labs/openccip-sdk), it acquires the most optimal pathways for executing multi-chain transactions through the Chainlink CCIP (Cross-Chain Interoperability Protocol).

## Synchronized Chain States

- Ensure consistent states of different chains using [CRC1Syncable](https://github.com/Nava-Labs/openccip-contracts/tree/dev#crc1syncable).
- Synchronize and harmonize data across contracts on various blockchain networks.

## Cross-Chain ERC20 Token Support

- Leverage [CRC20](https://github.com/Nava-Labs/openccip-contracts/tree/dev#crc20-source-and-destination) contracts to enable ERC20 tokens' cross-chain functionality for payments within the NFT marketplace.

## Fee Automation

- Automate fee allocation for cross-chain transactions using [FeeAutomation](https://github.com/Nava-Labs/openccip-contracts/tree/dev#feeautomation), leveraging Chainlink automation to maintain fee balance across the application.

## How we built it

The main library consists of:

- **[CRC1](https://github.com/Nava-Labs/openccip-contracts/blob/dev/src/ccip/CRC1/CRC1.sol)** (Chainlink Request for Comment)
  - The foundational contract for building cross-chain applications using **Chainlink CCIP**. Enables functionalities like message sending, receiving, and processing across chains.
  - Supports Multihop functionality across all chains and Message Bundling for bulk operations by default.
- **[CRC1Syncable](https://github.com/Nava-Labs/openccip-contracts/blob/dev/src/ccip/CRC1/extensions/CRC1Syncable.sol)**
  - An extension of CRC1, designed for applications that require consistent states across contracts on various chains.
  - Manages cross-chain data synchronization and state harmonization.
  - **[Trustable](https://github.com/Nava-Labs/openccip-contracts/blob/dev/src/ccip/CRC1/Trustable.sol)**
  - Provides a security layer for CRC1, ensuring secure cross-chain operations.
- **[CRC20](https://github.com/Nava-Labs/openccip-contracts/tree/dev/src/ccip/CRC20)** (Source and Destination)
  - A framework for ERC20 tokens to operate across multiple chains, integrating with the CRC1 contract.
  - Split into [CRC20Source](https://github.com/Nava-Labs/openccip-contracts/blob/dev/src/ccip/CRC20/CRC20Source.sol) and [CRC20Destination](https://github.com/Nava-Labs/openccip-contracts/blob/dev/src/ccip/CRC20/CRC20Destination.sol) for token wrapping and deployment on various chains.
- **[FeeAutomation](https://github.com/Nava-Labs/openccip-contracts/blob/dev/src/ccip/CRC1/utils/FeeAutomation.sol)**
  - Utilize **Chainlink Automation** to maintain fee allocation in a cross-chain dApp.
  - Avoid maintaining $LINK balance manually.
  - Action triggered every time cross-chain app sends CCIP message, emitted MessageSent(bytes32,bytes) event.
- **[OpenCCIP SDK](https://github.com/Nava-Labs/openccip-sdk) - Dijkstra's Algorithm**:
  - Following the principle of Dijkstra's Shortest Path Algorithm, we assigned "weight" to each possible direct lane supported by CCIP which is calculated based on each blockchain _Time-To-Finality_, _5-day average gas price_, and _Transaction per Second_.
  - With the assigned "weight", the best route can be found. To make things easy from the front end, we build this into an SDK, so the front end only needs to pass the "from" and "to" chains. The SDK will find the best possible routes, which then will be passed to the smart contract for the cross-chain transaction to be executed.
- **[The Graph](https://github.com/Nava-Labs/openccip-subgraph)**:
  - Index data such as the details of listed NFTs and ease the process of showing data in the front end.
- **Supported Chains**:
  - Ethereum Sepolia Testnet
  - Optimism Goerli Testnet
  - Polygon Mumbai Testnet
  - Avalanche Fuji Testnet
  - BNB Chain Testnet
  - Base Goerli Testnet

## How to Run?

To get openCCIP App up and running, follow these simple steps:

### 1. Install the necessary dependency:

```bash
npm install
```

### 2. Run the development server:

```bash
npm run dev
```

### 2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
