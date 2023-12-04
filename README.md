# OpenCCIP

Additional Repositories: [OpenCCIP Smart Contracts](https://github.com/Nava-Labs/openccip-contracts) | [OpenCCIP SDK](https://github.com/Nava-Labs/openccip-sdk) | [OpenCCIP Subgraphs](https://github.com/Nava-Labs/openccip-subgraph)

### ✨ Inspiration ✨

Our journey began with an ambition to simplify the creation of cross-chain dApps, inspired by the challenges developers face when dealing with multiple blockchain networks. These complexities often slow down the development process, making it inefficient and cumbersome. To combat this, we focused on creating a library designed to integrate the Cross-Chain Interoperability Protocol (CCIP) effortlessly into dApps. Our goal was to make the development of dApps more efficient and user-friendly, enabling them to function smoothly across a variety of blockchain platforms.

This initiative was largely influenced by our firsthand experience in developing [Anyape](https://ethglobal.com/showcase/anyape-mmh8x) for ETH Online 2023. Through this, we realized the necessity of a dedicated library tailored for cross-chain dApp development. Our vision is to provide a library of smart contracts that simplifies cross-chain transactions, thereby reducing the hurdles and complexity typically associated with such processes. Our aim is to facilitate seamless interaction between dApps on different blockchains, enhancing user experience (UX) and broadening the scope of what dApps can achieve across diverse blockchain ecosystems.

## 🤔 What it does 🤔

OpenCCIP is a smart contract library abstracting CCIP functionality designed to assist developers in creating new dApps with inherent cross-chain capabilities. This advancement offers users the convenience of executing transactions seamlessly across different blockchain networks, thereby enhancing the overall user experience and expanding the utility of dApps.

We demonstrated the potential of OpenCCIP in an NFT marketplace, allowing users to purchase NFTs on one supported chain using funds from another supported chain. This application is just one example of the many possible uses of OpenCCIP. The platform's versatility extends to various other use cases, such as:

1. **Borrowing/Lending Protocol**: Enabling users to borrow funds on Optimism by providing collateral on Ethereum. This functionality paves the way for more accessible and varied financial interactions within the blockchain space.
2. **Derivatives DEX**: Allowing users to open positions on Avalanche by depositing margins on Polygon, thereby simplifying the process of trading derivatives.
3. **Launchpad Participation**: Facilitating user participation in token sales on Base, with pledges made using funds on Polygon. This opens up opportunities for broader engagement in emerging crypto projects.

Additionally, OpenCCIP has expanded its reach by extending the supported CCIP lanes, especially in cases where direct connections between chains are unavailable. For example, there isn't a direct link between **Polygon Mumbai** and _Base Goerli_. To overcome this, OpenCCIP establishes a pathway that connects **Polygon Mumbai** to Avalanche Fuji, and then from Avalanche Fuji to _Base Goerli_. This capability ensures that even without direct links between certain chains, efficient and secure pathways are available for value and message transfers.

This feature is available through our [SDK](https://github.com/Nava-Labs/openccip-sdk), which not only streamlines the integration with OpenCCIP smart contracts but also enhances the connection between the front end and these contracts. In designing the SDK, we adopted an intent-based architecture approach. This means that the dApp simply needs to provide the originating and destination chains, and the SDK will handle the rest. It identifies the most efficient routes and communicates this information to the OpenCCIP smart contracts.

## 🛠️ How we built it 🛠️

The main library consists of:

- **[CRC1](https://github.com/Nava-Labs/openccip-contracts/blob/dev/src/ccip/CRC1/CRC1.sol)** (Chainlink Request for Comment)
- The foundational contract for building cross-chain applications using **Chainlink CCIP**.
- Enables functionalities like message sending, receiving, and processing across chains.
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

## ⛰️ Challenges we ran into ⛰️

In developing OpenCCIP, we encountered several significant challenges that required innovative solutions and adaptability.

1. **Integrating Chainlink Functions into L2 Chains**: Our initial plan was to use **Chainlink Functions** to directly pass the best routing information from our API to the smart contract. However, we faced a major hurdle as **Chainlink Functions** are not supported on any Layer 2 (L2) blockchain networks. This limitation posed a significant challenge in our development process, as it required a reevaluation of our approach to integrating external data into smart contracts on L2 chains.

2. **Synchronizing Activity Data Across Chains**: Another challenge we faced was ensuring that all supported chains had synchronized activity data. This aspect is crucial for the seamless operation of cross-chain transactions and for maintaining data integrity across different blockchain networks. To address this, we utilized a combination of **CCIP** for the cross-chain messaging. This approach allowed us to effectively manage and synchronize data across multiple chains, overcoming one of the key technical challenges in our project.

## 💪🏼 Accomplishments, Lesson Learned, and Possible Future 💪🏼

1. **Integration Success**: We take great pride in successfully integrating a range of new and innovative technologies into a cohesive infrastructure. This includes the **CCIP**, **Chainlink Automation**, and **Dijkstra's Algorithm**. The fusion of these technologies has enabled us to create a robust and versatile system, demonstrating the potential of combining diverse technological components in the blockchain space.

2. **Overcoming Technical Limitations**: A significant accomplishment was our ability to devise and implement an alternate solution, despite facing the challenge of **Chainlink Functions** not being supported on the chains we targeted. This obstacle compelled us to think creatively and develop a workaround that maintained the functionality and integrity of our system. It's a testament to our team's problem-solving skills and resilience in the face of technical constraints.

3. **Vision for Future Standardization**: Looking towards the future, we believe that OpenCCIP has the potential to evolve beyond its current form. We envision OpenCCIP (specifically, the underlying engine rather than the NFT marketplace) being developed and optimized into an Ethereum Improvement Proposal (EIP). This would standardize our approach and serve as a valuable resource for other developers looking to launch their cross-chain projects, regardless of the application. By pursuing this path, we aim to contribute significantly to the blockchain community, paving the way for more seamless and efficient cross-chain interactions.

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
