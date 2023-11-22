import Image from "next/image";

export default function Marketplace() {
  return (
    <div className="flex flex-col">
      {/* <Image uri={item.uri} /> */}
      <div className="relative overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
        <Image
          src="/133-silver.webp"
          alt="Xxx"
          width={300}
          height={100}
          className="items-center"
        />
      </div>
      <div className="px-2 py-5 space-y-3">
        <span className="">
          {/* {item.collectionName} # {item.id.split("-")[1]} */}
          Anjay #1
        </span>
        <div className="flex border px-5 py-2 bg-neutral-900 rounded-xl justify-between space-x-7">
          <div className="flex flex-col gap-4">
            <span className="">
              {/* {Number(BigInt(item.price) / BigInt(1e18))} */}
              Price
            </span>
            <p>5000</p>
          </div>
          <div className="flex flex-col gap-4">
            <span>Chain</span>
            <img
              src="https://cryptologos.cc/logos/apecoin-ape-ape-logo.svg?v=026"
              className="h-5 items-center justify-center"
            />
          </div>
        </div>
        {/* <button className="py-1 px-5 rounded-lg border border-neutral-600 hover:bg-neutral-600">
            Buy
          </button> */}
      </div>
    </div>
  );
}
