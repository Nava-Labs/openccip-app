"use client";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import { chainList } from "@/lib/config/chain";
import { useSwitchNetwork } from "wagmi";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ClaimButton from "./ClaimButton";

const ConnectButton = dynamic(() => import("./ConnectButton"), {
  ssr: false,
  loading: () => {
    return <Skeleton className="h-9 w-40 my-0.5" />;
  },
});

export function Header() {
  const { switchNetwork } = useSwitchNetwork();
  const [selectedChain, setSelectedChain] = useState("Ethereum Sepolia");
  const [selectedChainId, setSelectedChainId] = useState(
    "16015286601757825753"
  );
  const [selectedFaucetAddress, setSelectedFaucetAddress] = useState(
    "0x6D15DD71beF579F89535817C8aCD4c342fbfc83A"
  );
  const handleChainSelect = async (
    chain: string,
    chainId: string,
    faucetAddress: string
  ) => {
    const selectedChainDetails = chainList.find((item) => item.name === chain);
    const selectedChainSlug = selectedChainDetails
      ? selectedChainDetails.slug
      : "";

    const selectedChainId = selectedChainDetails
      ? selectedChainDetails.chainId
      : 0;

    const selectedFaucetAddress = selectedChainDetails
      ? selectedChainDetails.faucet
      : "";

    setSelectedChain(chain);
    setSelectedChainId(chainId);
    setSelectedFaucetAddress(faucetAddress);

    try {
      switchNetwork && switchNetwork(selectedChainId);
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <div className="flex w-full items-center justify-between my-4">
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <Link href="/" passHref>
            <div className="flex items-center">
              <Image
                src="/logo/Crosslink_Logo_Mix.png"
                alt="Crosslink Logo"
                width={50}
                height={50}
              />
              <span className="text-lg rainbow-text ml-2">OpenCCIP</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center ml-9">
          <Link href="/marketplace">
            <span className="text-base">Marketplace</span>
          </Link>
        </div>
      </div>
      <div className="flex space-x-7">
        <div className="flex items-center rounded-md space-x-1 ">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex space-x-2 p-1 rounded-md items-center ">
              <img
                className="h-6 "
                src={
                  chainList.find((chain) => chain.name === selectedChain)
                    ?.logo ||
                  "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029"
                }
                alt={selectedChain}
              />
              <ChevronDownIcon className="h-5" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              className="flex flex-col bg-neutral-900 rounded-xl"
              side="left"
            >
              {chainList.map((chain) => (
                <DropdownMenu.Item
                  key={chain.chainSelector}
                  onSelect={() =>
                    handleChainSelect(
                      chain.name,
                      chain.chainSelector,
                      chain.faucet
                    )
                  }
                  className="flex items-center space-x-2 px-2 py-2 hover:bg-sky-500 cursor-pointer rounded-xl"
                >
                  <img className="h-5" src={chain.logo} alt={chain.name} />
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <ClaimButton faucetAddress={selectedFaucetAddress} />
        </div>
        <ConnectButton />
      </div>
    </div>
  );
}
