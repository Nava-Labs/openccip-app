import { graphql } from "../types";

export const getNftsQuery = graphql(`
  query GetNftsQuery {
    listedNFTs {
      id
      collectionName
      collectionAddress
      uri
      price
      owner
      chainOrigin
    }
  }
`);

export const getNftDetailsQuery = graphql(`
  query GetNftDetailsQuery($id: ID!) {
    listedNFT(id: $id) {
      activity {
        from
        price
        timestamp
        to
        type
      }
      collectionName
      owner
      price
      uri
    }
  }
`);
