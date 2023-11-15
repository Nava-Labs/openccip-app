function calculateBestRoutes(from:any, to:any){
  let chains = [
    {
      name: "Optimism",
      rpc: "",
      routerAddr: "0xEB52E9Ae4A9Fb37172978642d4C141ef53876f26",
      chainId: "",
      chainSelector: "2664363617261496610",
      logo: ""
    },
    {
      name: "Avalanche",
      rpc: "",
      routerAddr: "0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8",
      chainId: "",
      chainSelector: "14767482510784806043",
      logo: "",
    },
    {
      name: "Ethereum",
      rpc: "",
      routerAddr: "0xD0daae2231E9CB96b94C8512223533293C3693Bf",
      chainId: "",
      chainSelector: "16015286601757825753",
      logo: "",
    },
    {
      name: "Polygon",
      rpc: "",
      routerAddr: "0x70499c328e1E2a3c41108bd3730F6670a44595D1",
      chainSelector: "12532609583862916517",
      chainId: "",
      logo: "",
    },
    {
      name: "Arbitrum",
      rpc: "",
      routerAddr: "0x88E492127709447A5ABEFdaB8788a15B4567589E",
      chainSelector: "6101244977088475029",
      chainId: "",
      logo: "",
    },
    {
      name: "Base",
      rpc: "",
      routerAddr: "0xa8c0c11bf64af62cdca6f93d3769b88bdd7cb93d",
      chainSelector: "5790810961207155433",
      chainId: "",
      logo: "",
    },
    {
      name: "BSC",
      rpc: "",
      routerAddr: "0x9527e2d01a3064ef6b50c1da1c0cc523803bcff2",
      chainId: "13264668187771770619",
      logo: "",
    },
  ]

  const OP = 0, AVALANCHE=1, ETHEREUM=2, POLYGON=3, ARBITRUM = 4, BASE=5, BSC=6;
  const SUPPORTED_CHAINS = 7;
  const INF = 100000;
  let FROM = 0;
  let TO = 0;
  

  let parent = new Array(SUPPORTED_CHAINS);
  let dist = new Array(SUPPORTED_CHAINS);
  let edges = new Array(SUPPORTED_CHAINS);
  
  for(let i=0;i<chains.length;i++){
    if (chains[i].name.toLowerCase() == from ){
      FROM = i;
    }
    if (chains[i].name.toLowerCase() == to ){
      TO = i;
    }

    edges[i] = new Array(SUPPORTED_CHAINS);
    for(let j=0;j<SUPPORTED_CHAINS;j++){
      dist[i] = INF;
      edges[i][j] = INF;
      if (i==j){
        edges[i][j] = 0;
      }
    }
  }
  edges[OP][AVALANCHE] = 2
  edges[AVALANCHE][POLYGON] = 1
  edges[OP][ETHEREUM] = 1
  edges[ETHEREUM][POLYGON] = 10
  edges[OP][POLYGON] = 5
  
  dist[FROM] = 0; //initial start, otherwise assign INF
  
  for(let i=0;i<chains.length;i++){
    for(let j=0;j<chains.length;j++){
      if (dist[i] + edges[i][j] < dist[j] && dist[i]!=INF){
        dist[j] = dist[i] + edges[i][j];
        parent[j] = i; //keep the parent
      }
    }
  }

  let now = TO;
  let paths = new Array();
  while(now!=FROM){
    paths.push(now)
    now = parent[now];
  }
  paths.push(now);

  let data = new Array()
  for(let i=paths.length-1; i>=0; i--){ //paths are stored in 
    data.push(chains[paths[i]]);
  }

  return data;
}



export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  // console.log("from to ", from, to)
  let data = calculateBestRoutes(from?.toLowerCase(), to?.toLowerCase());
  return Response.json({
    data
  })
}