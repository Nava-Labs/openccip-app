"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { handleSendTx } from "@/lib/modules/hooks/handleSendTx";
import { chainList } from "@/lib/config/chain";
import { createWalletClient, custom } from "viem";
import { polygonMumbai, sepolia } from "viem/chains";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import { getNftDetailsQuery } from "@/lib/gql/queries/nft";
const { OpenCCIP } = require("openccip-sdk");

type Props = {
  tokenAddress: string;
  tokenId: string;
};

export default function BuyButton({ tokenAddress, tokenId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChain, setSelectedChain] = useState("");
  const [selectedChainId, setSelectedChainId] = useState("");
  const [bestRoutes, setBestRoutes] = useState<any[]>([]);
  const [showRoutes, setShowRoutes] = useState(false);

  const handleChainSelect = async (chain: string, chainId: string) => {
    const selectedChainDetails = chainList.find((item) => item.name === chain);
    const selectedChainSlug = selectedChainDetails
      ? selectedChainDetails.slug
      : "";

    setSelectedChain(chain);
    setSelectedChainId(chainId);

    try {
      await fetchData(selectedChainSlug);
      setShowRoutes(true);
    } catch (error) {
      console.error("Error getting best route:", error);
    }
  };

  const fetchData = async (FROM: string) => {
    const selectedChainDetails = chainList.find((item) => item.slug === FROM);

    const TO = "polygon-testnet";

    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const client = createWalletClient({
      chain: polygonMumbai,
      account,
      transport: custom(window.ethereum),
    });

    const openccip = new OpenCCIP(client);

    const bestRoutes = await openccip.fetchBestRoutes(FROM, TO);
    setBestRoutes(bestRoutes.data);
  };

  console.log("Best Route:", bestRoutes);

  return (
    <>
      <div className="flex items-center rounded-xl bg-blue-500 py-2">
        <div className="w-full text-center">
          <button
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              const result = await handleSendTx(tokenAddress);
              console.log(result);
            }}
            className="text-center flex-1 w-full"
          >
            {isLoading ? "Loading..." : "Buy"}
          </button>
        </div>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="flex space-x-2 items-center pl-5 pr-2 bg-blue-500 border-l-2">
            <img
              className="h-7 "
              src={
                chainList.find((chain) => chain.name === selectedChain)?.logo ||
                "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029"
              }
              alt={selectedChain}
            />
            <ChevronDownIcon className="h-5" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="flex flex-col bg-neutral-900 rounded-xl">
            {chainList.map((chain) => (
              <DropdownMenu.Item
                key={chain.chainSelector}
                onSelect={() =>
                  handleChainSelect(chain.name, chain.chainSelector)
                }
                className="flex items-center space-x-2 px-5 py-3 hover:bg-blue-500 cursor-pointer rounded-xl"
              >
                <img className="h-7" src={chain.logo} alt={chain.name} />
                <span>Pay from {chain.name}</span>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      <div className="flex items-center  py-2 mt-2">
        <div className="w-full text-center">
          {showRoutes && bestRoutes.length > 0 ? (
            <p>
              {bestRoutes.map((route, index) => (
                <span key={index} className="text-sm">
                  {route.name}
                  {index < bestRoutes.length - 1 ? " \u2192 " : ""}
                </span>
              ))}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
