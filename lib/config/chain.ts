export interface Chain {
  chainSelector: string;
  name: string;
  logo: string;
  slug: string;
  marketplaceAddr: string;
}

export const chainList: Chain[] = [
  {
    chainSelector: "16015286601757825753",
    name: "Ethereum Sepolia",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029",
    slug: "sepolia-testnet",
    marketplaceAddr: "0x00D3eB554920E8069eAAD98E75D5B36173A8ee03"
  },
  {
    chainSelector: "2664363617261496610",
    name: "Optimism Goerli",
    logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=029",
    slug: "op-testnet",
    marketplaceAddr: "0x68b9bDD80727CC031d5Be9918E071b8e615c3C31"
  },
  {
    chainSelector: "14767482510784806043",
    name: "Avalanche Fuji",
    logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=029",
    slug: "fuji-testnet",
    marketplaceAddr: "0xADc0aF0dd4eef8Ac9176ACF5F10Cd18830ae8342"
  },
  {
    chainSelector: "6101244977088475029",
    name: "Arbitrum Testnet",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=029",
    slug: "arbitrum-testnet",
    marketplaceAddr: "0x"
  },
  {
    chainSelector: "12532609583862916517",
    name: "Polygon Mumbai",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029",
    slug: "polygon-testnet",
    marketplaceAddr: "0x3b8a9c94c406f08Be7997136dF273FE652bc3612"
  },
  {
    chainSelector: "5790810961207155433",
    name: "Base Goerli",
    logo: "https://s3.ap-southeast-1.amazonaws.com/mesprotocol.com/mes_images/chain_logos/base_logo.svg",
    slug: "base-testnet",
    marketplaceAddr: "0x9aDa66369E1f548aB048C7FC708b6271994a16D4"
  },
  {
    chainSelector: "13264668187771770619",
    name: "BSC Testnet",
    logo: "https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=029",
    slug: "bsc-testnet",
    marketplaceAddr: "0xf3cef7fA414CB9a027f73a4d46f02092C5412862"
  },
];
