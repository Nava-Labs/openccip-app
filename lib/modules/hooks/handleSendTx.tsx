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
