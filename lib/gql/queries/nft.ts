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
        activityOrigin
        id
        timestamp
        price
        to
        type
      }
      collectionAddress
      collectionName
      id
      uri
      chainOrigin
      owner
      price
    }
  }
`);
