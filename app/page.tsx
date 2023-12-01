import Image from "next/image";
import { SyncInfo } from "./components/SyncInfo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>The Problem</h2>
          <p className={`m-0 text-sm opacity-50`}>
            - Too many chains <br />- Bridges are painful
            <br />- CCIP is still in its infancy (lacks standarization, some
            unsupported direct chains lanes)
          </p>
          <br />
          <h2 className={`mb-3 text-2xl font-semibold`}>The Solution</h2>
          <p className={`m-0 text-sm opacity-50`}>
            OpenCCIP: a smart contract library abstracting CCIP functionality
            <ul>
              <li className="text-white">
                - Multihop functionality: Extending the supported CCIP lanes,
                especially in cases where direct connections between chains are
                unavailable. For example, Base Goerli to Polygon Mumbai, so we
                route it from Base Goerli to Avalanche Fuji and then from Fuji
                to Mumbai.
              </li>
              <li className="text-white">
                - CRC1: The foundational contract for cross-chain applications
                utilizing CCIP.
              </li>
              <li>
                - CRC1Syncable: An extension of CRC1 to handle state
                synchronization across multiple chains.
              </li>
              <li>
                - CRC20: A framework to enable ERC20 tokens to operate across
                multiple chains.
              </li>
            </ul>
          </p>
        </div>
      </div>
      <SyncInfo />
    </main>
  );
}
