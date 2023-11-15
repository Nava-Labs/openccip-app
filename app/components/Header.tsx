import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <div className="container mx-auto py-5 sm:py-10">
      <header className="flex items-center md:justify-between gap-x-5">
        <Link href="/" passHref>
          <Image
            src="/logo/Crosslink Horizontal.svg"
            alt="Crosslink Logo"
            width={200}
            height={200}
          />
        </Link>
      </header>
    </div>
  );
}
