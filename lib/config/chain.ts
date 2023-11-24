export interface Chain {
  chainId: string;
  name: string;
  logo: string;
}

export const chainList: Chain[] = [
  {
    chainId: "16015286601757825753",
    name: "Ethereum Sepolia",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029",
  },
  {
    chainId: "2664363617261496610",
    name: "Optimism Goerli",
    logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=029",
  },
  {
    chainId: "14767482510784806043",
    name: "Avalanche Fuji",
    logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=029",
  },
  {
    chainId: "6101244977088475029",
    name: "Arbitrum Testnet",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=029",
  },
  {
    chainId: "12532609583862916517",
    name: "Polygon Mumbai",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029",
  },
  {
    chainId: "5790810961207155433",
    name: "Base Goerli",
    logo: "https://s3.ap-southeast-1.amazonaws.com/mesprotocol.com/mes_images/chain_logos/base_logo.svg",
  },
  {
    chainId: "13264668187771770619",
    name: "BSC Testnet",
    logo: "https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=029",
  },
];
