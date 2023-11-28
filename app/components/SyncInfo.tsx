"use client"; 
import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "../lib/utils";

import { getTimestamps } from "@/lib/modules/hooks/handleSendTx";
import { Marketplace_ABI } from "@/lib/abi/marketplace-abi";
import { chainList } from "@/lib/config/chain";

type Props={
}

type SyncState = "synced" | "syncing" | "fetching" | "error";


type TimestampData = {
  chainSelector:string,
  contractAddr: string,
  name: string,
  latestSyncTimestamp: BigInt,
  routerAddr: string,
  rpc: any
}

type FormattedTimestamp = {
  name: string,
  latestSyncTimestamp: BigInt,
  syncing: SyncState
}

function formatTimestamp(timestampData: TimestampData[]): FormattedTimestamp[]{
  let maxTimestamp:BigInt = BigInt(0);
  let formattedData:Array<FormattedTimestamp>=[];
  for(let i=0;i<timestampData.length;i++){
    if (maxTimestamp<timestampData[i].latestSyncTimestamp){
      maxTimestamp = timestampData[i].latestSyncTimestamp;
    }
    formattedData.push({
      name: timestampData[i].name,
      latestSyncTimestamp: timestampData[i].latestSyncTimestamp,
      syncing: "syncing"
    })
  }

  for(let i=0;i<timestampData.length;i++){
    if (maxTimestamp==formattedData[i].latestSyncTimestamp){
      formattedData[i].syncing = "synced";
    }
  }
  return formattedData
}

export const SyncInfo = async () => {
  "use client"; 
  const timestampData = await getTimestamps("base-testnet", chainList[5].marketplaceAddr, Marketplace_ABI );
  let formattedTimestamp:Array<FormattedTimestamp> = [];
  formattedTimestamp = formatTimestamp(timestampData);

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="border rounded-xl p-3">Info</button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content>
            <div className="border rounded-xl">
              <div className="p-3">
                <p>Chains:</p>
                {
                  formattedTimestamp.map((key)=>{
                    return <ChainStatus chainName={key.name} status={key.syncing} />
                  })
                }
                <ChainStatus chainName="Testt" status="syncing" />
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );

  function ChainStatus({
    chainName,
    status,
  }: {
    chainName: string;
    status: SyncState;
  }) {
    return (
      <div className="flex items-center space-x-4">
        <p>{chainName}</p>
        <Status state={status} />
      </div>
    );
  }

  function Status({
    state,
  }: {
    state: SyncState;
  }) {
    return (
      <div className="relative -mt-px">
        <div
          className={cn(
            state === "error" && "bg-red-500",
            state === "syncing" && "bg-amber-500",
            (state === "fetching") && "bg-teal-300",
            "w-2 h-2 rounded-full ring-2 ring-transparent"
          )}
        />
        {(state === "syncing" || state === "fetching") && (
          <div className="absolute -top-[4px] -left-[4px] animate-in fade-in zoom-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              className={cn(
                "w-4 h-4 transition-opacity",
                "animate-rotate-360",
                state === "fetching" && "text-teal-500 dark:text-teal-300",
                state === "syncing" && "text-amber-500 dark:text-amber-300"
              )}
              fill="none"
              viewBox="0 0 66 66"
            >
              <circle
                cx="33"
                cy="33"
                fill="none"
                r="28"
                stroke="currentColor"
                strokeWidth="8"
                className="opacity-0"
              />
              <circle
                cx="33"
                cy="33"
                fill="none"
                r="28"
                stroke="currentColor"
                strokeDasharray="40, 130"
                strokeDashoffset="325"
                strokeLinecap="round"
                strokeWidth="8"
                className="opacity-70"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }
};
