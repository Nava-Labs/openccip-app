import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";

const ConnectButton = dynamic(() => import("./ConnectButton"), {
  ssr: false,
  loading: () => {
    return <Skeleton className="h-9 w-40 my-0.5" />;
  },
});

export function Header() {
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
      <ConnectButton />
    </div>
  );
}
