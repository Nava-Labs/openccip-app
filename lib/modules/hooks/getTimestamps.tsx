import { createWalletClient, custom, http } from "viem";
const { OpenCCIP } = require("openccip-sdk");
import { baseGoerli, polygonMumbai } from "viem/chains";

export const getTimestamps = async (
  chain: string,
  contractAddr: string,
  contractABI: any
) => {
  const client = createWalletClient({
    chain: baseGoerli,
    transport: http(),
  });
  const openccip = new OpenCCIP(client);
  let timestampData = await openccip.getAllSyncTimestamps(
    chain,
    contractAddr,
    contractABI
  );
  return timestampData;
};
