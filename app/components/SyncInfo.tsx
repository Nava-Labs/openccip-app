import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "../lib/utils";

export const SyncInfo = () => {
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
                <ChainStatus chainName="Ethereum Sepolia" status="syncing" />
                <ChainStatus chainName="Polygon Mumbai" status="syncing" />
                <ChainStatus chainName="Avalanche Fuji" status="syncing" />
                <ChainStatus chainName="Base Goerli" status="syncing" />
                <ChainStatus chainName="Arbitrum Goerli" status="syncing" />
                <ChainStatus chainName="BSC Testnet" status="syncing" />
                <ChainStatus chainName="Optimism Goerli" status="syncing" />
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
    status: "idle" | "syncing" | "fetching" | "error";
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
    state: "idle" | "syncing" | "fetching" | "error";
  }) {
    return (
      <div className="relative -mt-px">
        <div
          className={cn(
            state === "error" && "bg-red-500",
            state === "syncing" && "bg-amber-500",
            (state === "idle" || state === "fetching") && "bg-teal-300",
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
