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
        <Link href="/" passHref>
          <Image
            src="/logo/Crosslink Horizontal.svg"
            alt="Crosslink Logo"
            width={200}
            height={200}
          />
        </Link>
        <Link href="/marketplace">
          <span className="text-base ml-4">Marketplace</span>
        </Link>
      </div>
      <ConnectButton />
    </div>
  );
}
