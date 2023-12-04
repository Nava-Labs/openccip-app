"use client";

import { Button } from "./ui/button";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { FAUCET_ABI } from "@/lib/abi/faucet-abi";
import { waitForTransaction } from "@wagmi/core";

type Props = {
  faucetAddress: string;
};

export default function ClaimButton({ faucetAddress }: Props) {
  const { config: faucetConfig } = usePrepareContractWrite({
    address: faucetAddress as `0x${string}`,
    abi: FAUCET_ABI,
    functionName: "claim",
  });

  const { write: claimFaucet, isLoading: isClaimingFaucet } = useContractWrite({
    ...faucetConfig,
    onSuccess: async (result) => {
      await waitForTransaction({ hash: result.hash, confirmations: 8 });
    },
  });

  return (
    <>
      <div className="flex items-center rounded-md space-x-1 ">
        <div className="w-full text-center">
          <Button
            variant="outline"
            loading={isClaimingFaucet}
            onClick={() => claimFaucet?.()}
          >
            Faucet
          </Button>
        </div>
      </div>
    </>
  );
}
