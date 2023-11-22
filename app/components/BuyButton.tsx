"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { handleSendTx } from "@/lib/modules/hooks/handleSendTx";

type Props = {
  tokenAddress: string;
  tokenId: string;
};

export function BuyButton({ tokenAddress, tokenId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChain, setSelectedChain] = useState("Polygon");
  const [selectedChainId, setSelectedChainId] = useState(80001);

  const handleChainSelect = (chain: string, chainId: number) => {
    setSelectedChain(chain);
    setSelectedChainId(chainId);
  };

  return (
    <>
      <div className="w-full text-center ">
        <button
          disabled={isLoading}
          onClick={async () => {
            setIsLoading(true);

            const result = await handleSendTx();
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
            className="h-7 items-center"
            src={
              selectedChain === "Polygon"
                ? "https://polygontechnology.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F89203c58-0bc9-48b4-898c-18a637150354%2FGradient_on_Transparent.png?table=block&id=d51ab665-6522-4ba6-8480-feb2e18f1a27&spaceId=51562dc1-1dc5-4484-bf96-2aeac848ae2f&width=600&userId=&cache=v2"
                : "/avalanche_logo.png"
            }
          />
          <ChevronDownIcon className="h-5" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="flex flex-col bg-neutral-900 rounded-xl">
          <DropdownMenu.Item
            onSelect={() => handleChainSelect("Polygon", 80001)}
            className=" flex items-center space-x-2 px-5 py-3 hover:bg-blue-500 cursor-pointer rounded-xl"
          >
            <img
              className="h-7"
              src="https://polygontechnology.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F89203c58-0bc9-48b4-898c-18a637150354%2FGradient_on_Transparent.png?table=block&id=d51ab665-6522-4ba6-8480-feb2e18f1a27&spaceId=51562dc1-1dc5-4484-bf96-2aeac848ae2f&width=600&userId=&cache=v2"
              alt="Polygon Logo"
            />
            <span>Pay from Polygon</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleChainSelect("Avalanche", 43113)}
            className=" flex items-center space-x-2 px-5 py-3 hover:bg-blue-500 cursor-pointer rounded-xl"
          >
            <img
              className="h-7"
              src="https://cryptologos.cc/logos/avalanche-avax-logo.png?v=029"
              alt="Avalanche Logo"
            />
            <span>Pay from Avalanche</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleChainSelect("Avalanche", 43113)}
            className=" flex items-center space-x-2 px-5 py-3 hover:bg-blue-500 cursor-pointer rounded-xl"
          >
            <img
              className="h-7"
              src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026"
              alt="Ethereum Logo"
            />
            <span>Coming Soon</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleChainSelect("Avalanche", 43113)}
            className=" flex items-center space-x-2 px-5 py-3 hover:bg-blue-500 cursor-pointer rounded-xl"
          >
            <img
              className="h-7"
              src="https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=026"
              alt="Arbitrum Logo"
            />
            <span>Coming Soon</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleChainSelect("Avalanche", 43113)}
            className=" flex items-center space-x-2 px-5 py-3 hover:bg-blue-500 cursor-pointer rounded-xl"
          >
            <img
              className="h-7"
              src="https://cryptologos.cc/logos/optimism-ethereum-op-logo.png?v=026"
              alt="Optimism Logo"
            />
            <span>Coming Soon</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => handleChainSelect("Avalanche", 43113)}
            className=" flex items-center space-x-2 px-5 py-3 hover:bg-blue-500 cursor-pointer rounded-xl"
          >
            <img
              className="h-7"
              src="https://cryptologos.cc/logos/bnb-bnb-logo.png?v=026"
              alt="BNB Smart Chain Logo"
            />
            <span>Coming Soon</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
}
