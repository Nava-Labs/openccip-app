"use client";

import React from "react";
import { useState, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "../lib/utils";

import { getTimestamps } from "@/lib/modules/hooks/getTimestamps";
import { Marketplace_ABI } from "@/lib/abi/marketplace-abi";
import { chainList } from "@/lib/config/chain";

type Props = {};

export type SyncState = "synced" | "syncing" | "fetching" | "error";

export type TimestampData = {
  chainSelector: string;
  contractAddr: string;
  name: string;
  latestSyncTimestamp: BigInt;
  routerAddr: string;
  rpc: any;
};

export type FormattedTimestamp = {
  name: string;
  latestSyncTimestamp: BigInt;
  syncing: SyncState;
};

export function formatTimestamp(
  timestampData: TimestampData[]
): FormattedTimestamp[] {
  let maxSyncTimestamp: BigInt = BigInt(0);
  const formattedData: FormattedTimestamp[] = [];

  for (const data of timestampData) {
    if (data.latestSyncTimestamp > maxSyncTimestamp) {
      maxSyncTimestamp = data.latestSyncTimestamp;
    }
    formattedData.push({
      name: data.name,
      latestSyncTimestamp: data.latestSyncTimestamp,
      syncing: "syncing",
    });
  }

  for (const formatted of formattedData) {
    if (formatted.latestSyncTimestamp === maxSyncTimestamp) {
      formatted.syncing = "synced";
    }
  }

  return formattedData;
}

export const SyncInfo = () => {
  const [timestampData, setTimestampData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTimestamps(
          "base-testnet",
          chainList[4].marketplaceAddr,
          Marketplace_ABI
        );
        if (!data) {
          throw new Error("Failed to fetch timestamp data");
        }
        setTimestampData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!timestampData) {
    return <div>Loading...</div>;
  }
  const formattedTimestamps = formatTimestamp(timestampData);

  return (
    <div>
      <div className="border rounded-xl">
        <div className="p-3 flex items-center">
          <span className="mr-4">Syncing Info:</span>
          <div className="flex gap-4">
            {formattedTimestamps.map((chain, index) => (
              <ChainStatus
                key={index}
                chainName={chain.name}
                status={chain.syncing}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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

function Status({ state }: { state: SyncState }) {
  return (
    <div className="relative -mt-px">
      <div
        className={cn(
          state === "error" && "bg-red-500",
          state === "syncing" && "bg-amber-500",
          state === "synced" && "bg-teal-300",
          "w-2 h-2 rounded-full ring-2 ring-transparent"
        )}
      />
      {(state === "syncing" || state === "synced") && (
        <div className="absolute -top-[4px] -left-[4px] animate-in fade-in zoom-in">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            className={cn(
              "w-4 h-4 transition-opacity",
              "animate-rotate-360",
              state === "synced" && "text-teal-500 dark:text-teal-300",
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
              // strokeDasharray="40, 130"
              // strokeDashoffset="325"
              // strokeLinecap="round"
              strokeWidth="8"
              className="opacity-70"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
