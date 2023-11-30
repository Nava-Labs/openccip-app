import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { NextResponse } from 'next/server';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['GET'],
})


function calculateBestRoutes(from:any, to:any){
  const chains = [
    {
      slug: "op-testnet",
      name: "Optimism Testnet",
      rpc: "",
      routerAddr: "0xEB52E9Ae4A9Fb37172978642d4C141ef53876f26",
      chainId: "",
      chainSelector: "2664363617261496610",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029",
    },
    {
      slug: "fuji-testnet",
      name: "Fuji Testnet",
      rpc: "",
      routerAddr: "0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8",
      chainId: "",
      chainSelector: "14767482510784806043",
      logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=029",
    },
    {
      slug: "sepolia-testnet",
      name: "Sepolia Testnet",
      rpc: "",
      routerAddr: "0xD0daae2231E9CB96b94C8512223533293C3693Bf",
      chainId: "",
      chainSelector: "16015286601757825753",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029",
    },
    {
      slug: "polygon-testnet",
      name: "Polygon Testnet",
      rpc: "",
      routerAddr: "0x70499c328e1E2a3c41108bd3730F6670a44595D1",
      chainSelector: "12532609583862916517",
      chainId: "",
      logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029",
    },
    {
      slug: "arbitrum-testnet",
      name: "Arbitrum Testnet",
      rpc: "",
      routerAddr: "0x88E492127709447A5ABEFdaB8788a15B4567589E",
      chainSelector: "6101244977088475029",
      chainId: "",
      logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=029",
    },
    {
      slug: "base-testnet",
      name: "Base Testnet",
      rpc: "",
      routerAddr: "0xa8c0c11bf64af62cdca6f93d3769b88bdd7cb93d",
      chainSelector: "5790810961207155433",
      chainId: "",
      logo: "https://s3.ap-southeast-1.amazonaws.com/mesprotocol.com/mes_images/chain_logos/base_logo.svg",
    },
    {
      slug: "bsc-testnet",
      name: "BSC Testnet",
      rpc: "",
      routerAddr: "0x9527e2d01a3064ef6b50c1da1c0cc523803bcff2",
      chainSelector: "13264668187771770619",
      chainId: "",
      logo: "https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=029",
    },
  ]

  const OP = 0, AVALANCHE=1, ETHEREUM=2, POLYGON=3, ARBITRUM = 4, BASE=5, BSC=6;
  const SUPPORTED_CHAINS = chains.length;
  const INF = 100000;
  let FROM = -1;
  let TO = -1;
  
  let added = new Array(SUPPORTED_CHAINS);
  let parent = new Array(SUPPORTED_CHAINS);
  let dist = new Array(SUPPORTED_CHAINS);
  let edges = new Array(SUPPORTED_CHAINS);
  
  for(let i=0;i<chains.length;i++){ //init the graph
    if (chains[i].slug === from ){
      FROM = i;
    }
    if (chains[i].slug === to ){
      TO = i;
    }
    added[i] = false;
    edges[i] = new Array(SUPPORTED_CHAINS);
    for(let j=0;j<SUPPORTED_CHAINS;j++){
      dist[i] = INF;
      edges[i][j] = INF;
      if (i==j){
        edges[i][j] = 0;
      }
    }
  }
  if (FROM==-1 || TO==-1){
    throw new Error("Can't find the source and destination. Please check your source and destination variable to match our slug(polygon-testnet, op-testnet)")
  }

  edges[OP][AVALANCHE] = 2
  
  edges[AVALANCHE][POLYGON] = 1
  edges[POLYGON][AVALANCHE] = 1
  
  edges[OP][ETHEREUM] = 10
  edges[ETHEREUM][POLYGON] = 10
  edges[OP][POLYGON] = 5

  edges[AVALANCHE][BASE] = 2
  edges[BASE][AVALANCHE] = 2
  
  edges[AVALANCHE][BSC] = 2
  edges[BSC][AVALANCHE] = 2

  dist[FROM] = 0; //initial start, otherwise assign INF
  parent[FROM] = -1; //from has no parent

  if (edges[FROM][TO]!=INF){ //direct path always chosen
    return getDataChains(chains, [TO, FROM]);
  }

  for(let i=0;i<chains.length;i++){
    let shortestDist = INF; //get current shortest dist
    let idx = -1;
    for(let j=0;j<chains.length;j++){
      if ( !added[j] && dist[j] < shortestDist ){
        idx = j;
        shortestDist = dist[j];
      }
    }
    if (idx==-1) break
    added[idx] = true;

    for(let j=0;j<chains.length;j++){
      if (shortestDist + edges[idx][j] < dist[j] && edges[i][j]!=INF){
        dist[j] = shortestDist + edges[idx][j];
        parent[j] = idx; //keep the parent
      }
    }
  }

  if (dist[TO] ==INF ){
    throw new Error("no path found")
  }
  let now = TO;
  let paths = new Array();

  while(parent[now]!=-1){
    paths.push(now)
    now = parent[now];
  }
  paths.push(now);

  return getDataChains(chains, paths);
}

function getDataChains(chains:any, paths:any){
  let data = new Array()
  for(let i=paths.length-1; i>=0; i--){ //paths are stored in 
    // if (paths[i] == -1 )continue;
    data.push(chains[paths[i]]);
  }
  return data;
}

function runMiddleware(
  req: NextApiRequest,
  res: NextResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   console.log("a")
//   await runMiddleware(req, res, cors)
//   const { searchParams } = new URL(req.url! )
//   const from = searchParams.get('from')
//   const to = searchParams.get('to')
//   try{
//     let data = await calculateBestRoutes(from?.toLowerCase(), to?.toLowerCase());
//     return Response.json({
//       data
//     })
//   }catch(error){
//     const errorMessage = (error as Error).message || 'An error occurred';

//     return Response.json({
//       error: errorMessage
//     })
//   }
// }

export async function GET(
  request: Request
  ) {
  // let res = NextResponse.next()
  // await runMiddleware(req, res, cors)
  const { searchParams } = new URL(request.url )
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  try{
    let data = await calculateBestRoutes(from?.toLowerCase(), to?.toLowerCase());
    return Response.json({
      data
    },{
      status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      "Access-Control-Allow-Credentials":  "true" 
    },
    })
  }catch(error){
    const errorMessage = (error as Error).message || 'An error occurred';

    return Response.json({
      error: errorMessage
    })
  }
}