
import { createWalletClient, custom, http } from "viem";
const { OpenCCIP } = require("openccip-sdk");
import { polygonMumbai } from "viem/chains";

export type TxMetadata = {
  to: string;
  value: string;
  data: string;
};

export type SendTxArgs = {
  walletAddress: string;
  txMetadata: TxMetadata[];
};

export const handleSendTx = async () => {
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const FROM = "polygon-testnet";
  const TO = "bsc-testnet";

  const client = createWalletClient({
    chain: polygonMumbai,
    account,
    transport: custom(window.ethereum),
  });

  const openccip = new OpenCCIP(client);

  console.log(await openccip.fetchBestRoutes(FROM, TO));
};

export const getTimestamps = async (chain: string, contractAddr: string, contractABI: any) => {
  const client = createWalletClient({
    chain: polygonMumbai,
    transport: http(),
  });
  console.log("contract addr ", contractAddr)
  console.log("ini client nya apa ", client)
  const openccip = new OpenCCIP(client);
  let timestampData = await openccip.getAllSyncTimestamps(chain, contractAddr, contractABI);
  return timestampData;
};