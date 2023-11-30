import Image from "next/image";
import { SyncInfo } from "./components/SyncInfo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 lg:text-left">
          <h2 className={`mb-3 text-2xl font-semibold`}>The Problem </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            According to DefiLlama, there are 234 chains and with the
            advancement of chain-creation tooling such as Arbitrum Orbit, OP
            Stack, and Polygon CDK, we&apos;ll see more chains launched. dApps
            will need to adapt to this and we believe Chainlink CCIP is the
            answer.
            <br />
            <br />
            From our firsthand experience building AnyApe for ETHOnline 2023, a
            cross-chain NFT marketplace built with CCIP. We wouldn&apos;t say
            the DX is bad per se, but it could be improved to ease developer in
            building a cross-chain dApps.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 lg:text-center">
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

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 lg:text-right">
          <h2 className={`mb-3 text-2xl font-semibold`}>The Solution</h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            OpenCCIP is a smart contract library abstracting CCIP functionality
            designed to assist developers in creating cross-chain dApps.
            <br />
            <br />
            OpenCCIP also keep security in mind and added various features such
            as cross-chain data synching and cross-chain token handling. We also
            created an SDK for finding the best lanes in processing transaction
            across chains and easy integration between the front end and
            OpenCCIP smart contracts.
          </p>
        </div>
      </div>
      <SyncInfo />
    </main>
  );
}
