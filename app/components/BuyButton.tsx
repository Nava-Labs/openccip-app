"use client";

import { useMemo, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { handleSendTx } from "@/lib/modules/hooks/handleSendTx";
import { chainList } from "@/lib/config/chain";
import { createWalletClient, custom } from "viem";
import { polygonMumbai, sepolia } from "viem/chains";
import { Marketplace_ABI } from "@/lib/abi/marketplace-abi";
const { OpenCCIP } = require("openccip-sdk");
import { useContractRead, useNetwork, useSwitchNetwork } from "wagmi";
import { useApprove } from "@/lib/modules/hooks/useApprove";
import { useBalanceAndAllowance } from "@/lib/modules/hooks/useBalanceAndAllowance";
import { Button } from "./ui/button";

type Props = {
  nftAddress: string;
  tokenId: string;
  chainOrigin: string;
  price: string;
};

export default function BuyButton({
  nftAddress,
  tokenId,
  chainOrigin,
  price,
}: Props) {
  const { switchNetwork } = useSwitchNetwork();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChain, setSelectedChain] = useState("Ethereum Sepolia");
  const [selectedChainId, setSelectedChainId] = useState(
    "16015286601757825753"
  );
  const [bestRoutes, setBestRoutes] = useState<any[]>([]);
  const [showRoutes, setShowRoutes] = useState(false);
  const [marketplaceAddr, setMarketplaceAddr] = useState(
    "0x00D3eB554920E8069eAAD98E75D5B36173A8ee03"
  );
  const [openCCIPEthAddr, setOpenCCIPEthAddr] = useState(
    "0x20AF34a33637C2c1671E071Dba89FB68f4403334"
  );

  const handleChainSelect = async (
    chain: string,
    chainId: string,
    marketplaceAddr: string,
    ccipToken: string
  ) => {
    const selectedChainDetails = chainList.find((item) => item.name === chain);
    const selectedChainSlug = selectedChainDetails
      ? selectedChainDetails.slug
      : "";

    const selectedChainId = selectedChainDetails
      ? selectedChainDetails.chainId
      : 0;

    const selectedMarketplace = selectedChainDetails
      ? selectedChainDetails.marketplaceAddr
      : "";
    const selectedOpenCCIP = selectedChainDetails
      ? selectedChainDetails.ccipToken
      : "";

    setSelectedChain(chain);
    setSelectedChainId(chainId);
    setMarketplaceAddr(marketplaceAddr);
    setOpenCCIPEthAddr(ccipToken);

    try {
      await fetchData(selectedChainSlug);
      setShowRoutes(true);
      switchNetwork && switchNetwork(selectedChainId);
    } catch (error) {
      console.error("Error getting best route:", error);
    }
  };

  const { write: approveToken, isLoading: isApprovingToken } = useApprove({
    address: openCCIPEthAddr as `0x${string}`,
    spender: marketplaceAddr as `0x${string}`,
    onSuccess: async () => {
      await refetchBalanceAndAllowance();
    },
  });

  const { allowance: allowance, refetch: refetchBalanceAndAllowance } =
    useBalanceAndAllowance(
      openCCIPEthAddr as `0x${string}`,
      marketplaceAddr as `0x${string}`
    );

  const isApproved = useMemo(() => {
    return allowance >= BigInt(price);
  }, [allowance, price]);

  const fetchData = async (FROM: string) => {
    const nftDetails = chainList.find(
      (item) => item.chainSelector === chainOrigin
    );
    const selectedChainDetails = chainList.find((item) => item.slug === FROM);

    const TO = nftDetails?.slug;

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

  // console.log("Best Route:", bestRoutes);

  return (
    <>
      <div className="flex items-center rounded-xl bg-blue-500 py-2">
        <div className="w-full text-center">
          {(() => {
            if (!isApproved) {
              return (
                <Button
                  disabled={!approveToken}
                  loading={isApprovingToken}
                  onClick={() => approveToken?.()}
                >
                  Approve
                </Button>
              );
            }
            return (
              <Button
                disabled={isLoading}
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    const result = await handleSendTx({
                      nftAddress,
                      tokenId,
                      chainOrigin,
                      payFrom: selectedChainId,
                    });
                    console.log(result);
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setIsLoading(false);
                  }
                }}
                className="text-center flex-1 w-full"
              >
                Buy
              </Button>
            );
          })()}
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
                  handleChainSelect(
                    chain.name,
                    chain.chainSelector,
                    chain.marketplaceAddr,
                    chain.ccipToken
                  )
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
