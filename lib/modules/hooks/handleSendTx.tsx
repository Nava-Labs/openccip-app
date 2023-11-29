import { Marketplace_ABI } from "@/lib/abi/marketplace-abi";
import { chainList } from "@/lib/config/chain";
import { createWalletClient, custom } from "viem";
const { OpenCCIP } = require("openccip-sdk");
import { baseGoerli, polygon, polygonMumbai, sepolia } from "viem/chains";

// export type TxMetadata = {
//   to: string;
//   value: string;
//   data: string;
// };

// export type SendTxArgs = {
//   walletAddress: string;
//   txMetadata: TxMetadata[];
// };

// const mockNftAddress = "0xf3cef7fA414CB9a027f73a4d46f02092C5412862";

// export const handleSendTx = async () => {
//   const [account] = await window.ethereum.request({
//     method: "eth_requestAccounts",
//   });

//   const client = createWalletClient({
//     chain: baseGoerli,
//     account,
//     transport: custom(window.ethereum),
//   });

//   const openccip = new OpenCCIP(client);

//   const contractDetails = {
//     contractAddr: mockNftAddress,
//     contractABI: Marketplace_ABI,
//     functionName: "buy",
//     args: [
//       1,
//       "0xadb4517822664c767c2eb5f3a72fa2e7028c7905", //tokenAddr
//       "2", //tokenId
//     ],
//   };

//   const FROM = "base-testnet";
//   const TO = "bsc-testnet";

//   // let route = await openccip.fetchBestRoutes(FROM, TO);
//   // console.log("rute", route);

//   let hash = await openccip.hopThenExecute(FROM, TO, contractDetails);
//   console.log(hash);
// };

type Props = {
  nftAddress: string;
  tokenId: string;
  chainOrigin: string;
  payFrom: string;
};

export const handleSendTx = async ({
  nftAddress,
  tokenId,
  chainOrigin,
  payFrom,
}: Props) => {
  const nftDetails = chainList.find(
    (item) => item.chainSelector === chainOrigin
  );
  console.log("nft", nftDetails);
  const selectedChainDetails = chainList.find(
    (item) => item.chainSelector === payFrom
  );

  const marketplaceAddr = selectedChainDetails?.marketplaceAddr;

  const TO = nftDetails?.slug;

  const account = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const client = createWalletClient({
    chain: polygonMumbai,
    account,
    transport: custom(window.ethereum),
  });

  const openccip = new OpenCCIP(client);

  const contractDetails = {
    contractAddr: marketplaceAddr,
    contractABI: Marketplace_ABI,
    functionName: "buy",
    args: [
      1,
      nftAddress, //tokenAddr
      tokenId, //tokenId
    ],
  };
  // console.log("2", selectedChainDetails?.slug);
  // console.log(selectedChainDetails?.marketplaceAddr);
  // console.log("to", TO);
  // console.log("3", contractDetails);

  const sendTx = await openccip.hopThenExecute(payFrom, TO, contractDetails);
  console.log(sendTx);
  // let route = await openccip.fetchBestRoutes(selectedChainDetails?.slug, TO);
  // console.log("rute", route);

  // try {
  //   const sendTx = await openccip.hopThenExecute(
  //     selectedChainDetails?.slug,
  //     TO,
  //     contractDetails
  //   );
  //   console.log(sendTx);
  // } catch (error) {
  //   console.error("Error in hopThenExecute:", error);
  // }
};
