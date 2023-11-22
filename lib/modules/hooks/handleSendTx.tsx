import { createWalletClient, custom, http } from "viem";
const { CrossLink } = require("crosslink-sdk");
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

  const crosslink = new CrossLink(client);

  console.log(await crosslink.fetchBestRoutes(FROM, TO));
};
