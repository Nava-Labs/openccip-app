"use client";

import Image from "next/image";
import { SyncInfo } from "./components/SyncInfo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 lg:text-left">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            How we build Crosslink?{" "}
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            <ul className="list-disc">
              <li>
                Chainlink CCIP: allows the seamless cross-chain transfer and
                balance data syncing of these extended tokens used for payment.
              </li>
              <li>
                The Graph: Index data such as the details of listed NFTs and
                ease the process of showing data in the front end.
              </li>
              <li>
                Djikstra&apos;s Algorithm: Built into an SDK. It helps finding
                the best route between chains without direct lane and
                interacting with smart contract.
              </li>
            </ul>
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 lg:text-center">
          <h2 className={`mb-3 text-2xl font-semibold`}>What is Crosslink? </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Crosslink aids developers in integrating cross-chain functionality
            into new or existing dApps, enabling seamless transactions across
            different blockchains to improve user experience. We&apos;ll be
            showcasing its utility in an NFT marketplace, where users could buy
            NFTs on one chain using funds from another, exemplifying
            Crosslink&apos;s versatility in practical applications.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 lg:text-right">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Why we build Crosslink?{" "}
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            We want to remove the frictions users experience when moving funds
            across various chains. The most pressing issue is finding a bridge
            protocol that supports both the source and destination chains,
            aligns with the asset being transferred, and provides ample
            liquidity for the transaction. Compounding these challenges are the
            security risks.
          </p>
        </div>
      </div>

      <SyncInfo />
    </main>
  );
}
