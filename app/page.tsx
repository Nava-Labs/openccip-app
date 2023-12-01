import Image from "next/image";
import { SyncInfo } from "./components/SyncInfo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 lg:text-left">
          <h2 className={`mb-3 text-2xl font-semibold`}>The Problem</h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            - Too many chains
            <br />- CCIP is still in its infancy
          </p>
          <br />
          <h2 className={`mb-3 text-2xl font-semibold`}>The Solution</h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            - OpenCCIP: a smart contract library abstracting CCIP functionality,
            currently consisting of CRC1, CRC1Syncable, Trustable, CRC20, Fee
            Automation, and OpenCCIP SDK.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 lg:text-right">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Utilized Chainlink Services{" "}
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            <ul>
              <li>- CRC1 & CRC20 uses Chainlink CCIP</li>
              <li>- Fee Automation uses Chainlink Automations</li>
            </ul>
          </p>
        </div>
      </div>
      <SyncInfo />
    </main>
  );
}
