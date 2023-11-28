// export const dynamic = "force-dynamic";
"use client"
import { useState, useEffect } from 'react'
import CustomImage from "./modules/Image";
import { getNftsQuery } from "@/lib/gql/queries/nft";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import Link from "next/link";
import { chainList } from "@/lib/config/chain";
import openCCIPEth from "@/public/openccip-eth.png";
import Image from "next/image";
import { SyncInfo, formatTimestamp, FormattedTimestamp, TimestampData, SyncState } from "../components/SyncInfo";

import { getTimestamps } from "@/lib/modules/hooks/handleSendTx";
import { Marketplace_ABI } from "@/lib/abi/marketplace-abi";

const client = new Client({
  url: "https://api.thegraph.com/subgraphs/name/erwinphanglius/crosslink-subgraph",
  exchanges: [cacheExchange, fetchExchange],
});

export default function Marketplace() {

  const [formattedTimestamp, setFormatedTimestamp] = useState<Array<FormattedTimestamp>>()
  const [nfts, setnfts] = useState([])
  useEffect(() => {
    const getTimestampData = async()=>{
      let timestampData = await getTimestamps("base-testnet", chainList[4].marketplaceAddr, Marketplace_ABI );
      let formattedTimestamp:Array<FormattedTimestamp> = [];
      formattedTimestamp = formatTimestamp(timestampData);
      setFormatedTimestamp(formattedTimestamp);
    }

    const getNFTs = async()=>{
      const nftsRes = await client.query(getNftsQuery, {}).toPromise();

      if (!nftsRes) throw new Error("Failed to fetch NFTs");

      let nfts:any = nftsRes.data?.listedNFTs.filter((item) => item.price !== "0");
      console.log("yoyoyo ", nfts)
      setnfts(nfts);
    }

    getTimestampData()
    getNFTs()
  }, [])

  // console.log("yooyoy ", timestampData)

  return (
    <>
    <div className="grid grid-cols-4 gap-10">
      {nfts?.map((item: any) => {
        const chainInfo = chainList.find(
          (chain) => chain.chainSelector === item.chainOrigin
        );

        let borderColorClass = "border border-neutral-500";

        if (chainInfo) {
          switch (chainInfo.name) {
            case "Ethereum Sepolia":
              borderColorClass = "border-4 border-neutral-500";
              break;
            case "Base Goerli":
              borderColorClass = "border-4 border-blue-500";
              break;
            case "Avalanche Fuji":
              borderColorClass = "border-4 border-rose-500";
              break;
            case "BSC Testnet":
              borderColorClass = "border-4 border-yellow-500";
              break;
            case "Polygon Mumbai":
              borderColorClass = "border-4 border-indigo-500";
              break;
            case "Optimism Goerli":
              borderColorClass = "border-4 border-green-500";
              break;
            case "Arbitrum Testnet":
              borderColorClass = "border-4 border-sky-500";
              break;
            default:
              borderColorClass = "border-4 border-neutral-500";
              break;
          }
        }

        return (
          <Link key={item.id} href={`./marketplace/${item.id}`}>
            <div className={`flex flex-col rounded-xl ${borderColorClass}`}>
              <div className="relative  overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
                <CustomImage uri={item.uri} />
              </div>
              <div className="px-2 py-5 space-y-3 whitespace-nowrap">
                <span className="">
                  {item.collectionName} # {item.id.split("-")[1]}
                </span>
                <div className="flex border px-5 py-2 bg-neutral-900 rounded-xl justify-between space-x-7">
                  <div className="flex flex-col gap-4">
                    <span className="">Price</span>
                    <div className="flex flex-row gap-2 ">
                      <Image
                        src={openCCIPEth}
                        alt="openCCIP ETH"
                        width={20}
                        height={20}
                      />
                      {Number(BigInt(item.price) / BigInt(1e18))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <span>Chain</span>
                    {chainInfo ? (
                      <img
                        src={chainInfo.logo}
                        className="h-5 items-center justify-center"
                      />
                    ) : (
                      <span>Chain information not found</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}      
    </div>

    <SyncInfo/>
    </>    
  );
}
