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

// const mockNftAddress = "0x9aDa66369E1f548aB048C7FC708b6271994a16D4";

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
//       "0xfde68cbba7c34ac4e39d2a929c75dff916dc0220", //tokenAddr
//       "1", //tokenId
//     ],
//   };

//   const FROM = "base-testnet";
//   const TO = "polygon-testnet";

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

  const selectedChainDetails = chainList.find(
    (item) => item.chainSelector === payFrom
  );

  const marketplaceAddr = selectedChainDetails?.marketplaceAddr;

  const FROM = selectedChainDetails?.slug;
  const TO = nftDetails?.slug;

  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const client = createWalletClient({
    chain: baseGoerli,
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

  const sendTx = await openccip.hopThenExecute(FROM, TO, contractDetails);
  console.log(sendTx);
  // let route = await openccip.fetchBestRoutes(selectedChainDetails?.slug, TO);
  // console.log("rute", route);

  // try {
  //   const sendTx = await openccip.hopThenExecute(FROM, TO, contractDetails);
  //   console.log(sendTx);
  // } catch (error) {
  //   console.error("Error in hopThenExecute:", error);
  // }
};
