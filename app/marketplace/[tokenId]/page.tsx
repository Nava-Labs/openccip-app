import {
  ArrowsUpDownIcon,
  BanknotesIcon,
  InformationCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { BuyButton } from "@/app/components/BuyButton";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import { getNftDetailsQuery } from "@/lib/gql/queries/nft";
import truncateEthAddress from "truncate-eth-address";
import { chainList } from "@/lib/config/chain";
import React from "react";

const client = new Client({
  url: "https://api.thegraph.com/subgraphs/name/erwinphanglius/crosslink-subgraph",
  exchanges: [cacheExchange, fetchExchange],
});

type Params = {
  params: {
    tokenId: string;
  };
};

export default async function NftDetails({ params }: Params) {
  const tokenAddress = params.tokenId.split("-")[0];
  const tokenId = params.tokenId.split("-")[1];

  const nftDetailsRes = await client
    .query(getNftDetailsQuery, {
      id: params.tokenId,
    })
    .toPromise();
  if (!nftDetailsRes) throw new Error("Failed to fetch NFT details");

  const nftDetails = nftDetailsRes.data?.listedNFT!;
  const baseUriWithId = nftDetails.uri;

  const response = await fetch(baseUriWithId);
  const data = await response.json();
  let imageUrl = data.image;

  if (imageUrl && imageUrl.startsWith("ipfs://")) {
    imageUrl = imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  return (
    <div className="flex gap-x-8 h-full w-full">
      <div className="flex flex-col w-1/2">
        <div className="w-full">
          <div className="flex h-full w-full items-center justify-center">
            <img src={imageUrl} className="w-full h-full" />
          </div>
        </div>
      </div>

      <div className="flex flex-col py-5 space-y-8 w-1/2 justify-center">
        <div>
          <div className="text-2xl">
            {nftDetails.collectionName} #{params.tokenId.split("-")[1]}
          </div>
          <div className="flex flex-row space-x-3 ">
            <UserIcon className="h-5 " />
            <div>Owned by {truncateEthAddress(nftDetails.owner)}</div>
          </div>
        </div>

        <div className="flex flex-col w-full border border-neutral-500 rounded-lg bg-neutral-900">
          <div className="flex items-center space-x-3 p-2 border-b">
            <BanknotesIcon className="h-5" />
            <div className="text-lg">Price</div>
          </div>

          <div className="flex gap-x-2 justify-center items-center py-3">
            {nftDetails.chainOrigin && (
              <span className="text-lg">
                {chainList.map((chain) => {
                  if (chain.chainId === nftDetails.chainOrigin) {
                    return (
                      <img
                        key={chain.chainId}
                        src={chain.logo}
                        className="h-5 items-center justify-center"
                      />
                    );
                  }
                  return null;
                })}
              </span>
            )}
            <span className="text-lg">
              {nftDetails.price === "0" ? "0" : Number(nftDetails.price) / 1e18}
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
              {nftDetails.activity.map((item: any, index: number) => (
                <TableBody key={index}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    {Number(BigInt(item.price) / BigInt(1e18))}
                  </TableCell>
                  <TableCell>{truncateEthAddress(item.from)}</TableCell>
                  <TableCell>{truncateEthAddress(item.to)}</TableCell>
                  <TableCell>
                    {new Date(item.timestamp * 1000).toLocaleDateString()}
                  </TableCell>
                </TableBody>
              ))}
            </Table>
          </div>
        </div>

        <div className="flex flex-col w-full border border-neutral-500 rounded-lg bg-neutral-900">
          <div>
            <div className="flex items-center space-x-2 p-2 border-b">
              <InformationCircleIcon className="h-5" />
              <div className="text-lg">Details</div>
            </div>
          </div>
          {chainList.map((chain) => {
            if (chain.chainId === nftDetails.chainOrigin) {
              return (
                <div className="p-4" key={chain.chainId}>
                  <ul className="list-none space-y-2 justify-between">
                    <li>
                      Contract address:{" "}
                      {truncateEthAddress(nftDetails.id.split("-")[0])}
                    </li>
                    <li>Chain: {chain.name}</li>
                    <li>Token ID: {nftDetails.id.split("-")[1]}</li>
                  </ul>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
