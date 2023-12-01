export interface Chain {
  chainSelector: string;
  name: string;
  logo: string;
  slug: string;
  rpc: string;
  routerAddr: string;
  chainId: number;
  marketplaceAddr: string;
  ccipToken: string;
}

export const chainList: Chain[] = [
  {
    chainSelector: "16015286601757825753",
    name: "Ethereum Sepolia",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029",
    slug: "sepolia-testnet",
    rpc: "",
    routerAddr: "0xD0daae2231E9CB96b94C8512223533293C3693Bf",
    chainId: 11155111,
    marketplaceAddr: "0xd88b22CBB849232A93e5BC6c61D4195709C39dE4",
    ccipToken: "0x20AF34a33637C2c1671E071Dba89FB68f4403334",
  },
  // {
  //   chainSelector: "2664363617261496610",
  //   name: "Optimism Goerli",
  //   logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=029",
  //   slug: "op-testnet",
  //   rpc: "",
  //   routerAddr: "0xEB52E9Ae4A9Fb37172978642d4C141ef53876f26",
  //   chainId: 420,
  //   marketplaceAddr: "0x68b9bDD80727CC031d5Be9918E071b8e615c3C31",

  // },
  {
    chainSelector: "14767482510784806043",
    name: "Avalanche Fuji",
    logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=029",
    slug: "fuji-testnet",
    rpc: "",
    routerAddr: "0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8",
    chainId: 43113,
    marketplaceAddr: "0x1dEACeF410005b6c670F35cBFf0Da98a6D606e4A",
    ccipToken: "0xb165891E7b98De56E96662981a8966c357477d5c",
  },
  {
    chainSelector: "6101244977088475029",
    name: "Arbitrum Testnet",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=029",
    slug: "arbitrum-testnet",
    rpc: "",
    routerAddr: "0x88E492127709447A5ABEFdaB8788a15B4567589E",
    chainId: 421613,
    marketplaceAddr: "0x",
    ccipToken: "",
  },
  {
    chainSelector: "12532609583862916517",
    name: "Polygon Mumbai",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029",
    slug: "polygon-testnet",
    rpc: "",
    routerAddr: "0x70499c328e1E2a3c41108bd3730F6670a44595D1",
    chainId: 80001,
    marketplaceAddr: "0xBEca54a2125EBf272D65ea4e03A2C9F030D2b619",
    ccipToken: " 0xAB299f4012524cC191B17908E9161b05Bb1088DE",
  },
  {
    chainSelector: "5790810961207155433",
    name: "Base Goerli",
    logo: "https://s3.ap-southeast-1.amazonaws.com/mesprotocol.com/mes_images/chain_logos/base_logo.svg",
    slug: "base-testnet",
    rpc: "",
    routerAddr: "0xa8c0c11bf64af62cdca6f93d3769b88bdd7cb93d",
    chainId: 84531,
    marketplaceAddr: "0x4A1e43392E68239A918F675D0826AB294923b5C3",
    ccipToken: "0x162f2E18935394CA0A1643ae9371A351d6451d2f",
  },
  // {
  //   chainSelector: "13264668187771770619",
  //   name: "BSC Testnet",
  //   logo: "https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=029",
  //   slug: "bsc-testnet",
  //   rpc: "",
  //   routerAddr: "0x9527e2d01a3064ef6b50c1da1c0cc523803bcff2",
  //   chainId: 97,
  //   marketplaceAddr: "0x40D969600d2B2a884AB80747C8448df57F412f47",
  //   ccipToken: "0x5feEAADDEc496dAf41D80c56C7f5840eBcBCf26d",
  // },
];
