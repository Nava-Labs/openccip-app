// export const dynamic = "force-dynamic";

import Image from "./modules/Image";
import { getNftsQuery } from "@/lib/gql/queries/nft";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import Link from "next/link";

const client = new Client({
  url: "https://api.thegraph.com/subgraphs/name/erwinphanglius/crosslink-subgraph",
  exchanges: [cacheExchange, fetchExchange],
});

export default async function Marketplace() {
  const nftsRes = await client.query(getNftsQuery, {}).toPromise();
  if (!nftsRes) throw new Error("Failed to fetch NFTs");

  let nfts = nftsRes.data?.listedNFTs.filter((item) => item.price !== "0");

  return (
    <>
      {nfts?.map((item: any) => (
        <Link key={item.id} href={`./marketplace/${item.id}`}>
          <div className="flex flex-col">
            <div className="relative overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
              <Image uri={item.uri} />
            </div>
            <div className="px-2 py-5 space-y-3">
              <span className="">
                {item.collectionName} # {item.id.split("-")[1]}
              </span>
              <div className="flex border px-5 py-2 bg-neutral-900 rounded-xl justify-between space-x-7">
                <div className="flex flex-col gap-4">
                  <span className="">Price</span>
                  {Number(BigInt(item.price) / BigInt(1e18))}
                </div>
                <div className="flex flex-col gap-4">
                  <span>Chain</span>
                  <img
                    src="https://cryptologos.cc/logos/apecoin-ape-ape-logo.svg?v=026"
                    className="h-5 items-center justify-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
