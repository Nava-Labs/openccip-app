"use client";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsUpDownIcon,
  BanknotesIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { BuyButton } from "../components/BuyButton";
import { useState } from "react";

type Params = {
  params: {
    tokenId: string;
  };
};

export default function NftDetails({ params }: Params) {
  const tokenAddress = "1";
  const tokenId = "1";
  const [showDetails, setShowDetails] = useState(false); // State to handle collapsible section

  // Function to toggle collapsible section
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flex gap-x-8 h-full w-full">
      <div className="flex flex-col">
        <div className="w-full">
          <div className="flex h-full w-full items-center justify-center">
            {/* <img
              src={imageUrl}
              className="min-h-[500px] max-h-[500px] min-w-[500px] max-w-[500px]"
            /> */}
            <Image
              src="/133-silver.webp"
              alt="Xxx"
              width={900}
              height={500}
              className="items-center"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col py-5 w-full space-y-8">
        <div>
          {/* <div className="text-2xl">
            {nftDetails.collectionName} #{params.tokenId.split("-")[1]}
          </div> */}
          <div className="text-2xl ml-8">Anjay #1</div>
          {/* <div>Owned by {truncateEthAddress(nftDetails.owner)}</div> */}
          <div className="flex space-x-3">
            <UserIcon className="h-5 " />
            <div>Owned by 0x...1</div>
          </div>
        </div>

        <div className="flex flex-col w-full border border-neutral-500 rounded-lg bg-neutral-900">
          <div className="flex items-center space-x-3 p-2 border-b">
            <BanknotesIcon className="h-5" />
            <div className="text-lg">Price</div>
          </div>

          <div className="flex gap-x-2 justify-center items-center py-3">
            <img
              src="https://cryptologos.cc/logos/apecoin-ape-ape-logo.svg?v=026"
              className="h-8"
            />
            <span className="text-lg">
              {/* {nftDetails.price === "0" ? "0" : Number(nftDetails.price) / 1e18} */}
              10000
            </span>
          </div>

          <div className="px-2 pb-3">
            <div className="flex items-center rounded-xl bg-blue-500 py-2">
              <BuyButton tokenAddress={tokenAddress} tokenId={tokenId} />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full border border-neutral-500 rounded-lg bg-neutral-900">
          <div>
            <div className="flex items-center space-x-2 p-2 border-b">
              <ArrowsUpDownIcon className="h-5" />
              <div className="text-lg">Activity</div>
            </div>
            <Table>
              <TableHeader className="">
                <TableRow className="hover:bg-transparent">
                  <TableHead>Event</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              {/* {nftDetails.activity.map((item: any, index: number) => (
                <TableBody key={index}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    {Number(BigInt(item.price) / BigInt(1e18))} APE
                  </TableCell>
                  <TableCell>{truncateEthAddress(item.from)}</TableCell>
                  <TableCell>{truncateEthAddress(item.to)}</TableCell>
                  <TableCell>
                    {new Date(item.timestamp * 1000).toLocaleDateString()}
                  </TableCell>
                </TableBody>
              ))} */}
            </Table>
          </div>
        </div>

        <div className="flex flex-col w-full space-y-8">
          <div className="flex flex-col w-full border border-neutral-500 rounded-lg bg-neutral-900">
            <div
              className="flex items-center space-x-2 p-2 border-b cursor-pointer"
              onClick={toggleDetails}
            >
              {showDetails ? (
                <ChevronUpIcon className="h-4  top-2 right-2" />
              ) : (
                <ChevronDownIcon className="h-4  top-2 right-2" />
              )}
              <div className="text-lg">Details</div>
            </div>

            {showDetails && (
              <div className="p-4">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="py-2">Contract Address</td>
                      <td className="py-2">0x......</td>
                    </tr>
                    <tr>
                      <td className="py-2">Token ID</td>
                      <td className="py-2">1</td>
                    </tr>

                    <tr>
                      <td className="py-2">Chain</td>
                      <td className="py-2">Arbitrum</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
