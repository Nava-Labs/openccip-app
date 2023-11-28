"use client"

import React from "react";
import { useState, useEffect } from 'react'

type ImageProps = {
  uri: string;
};

const Image: React.FC<ImageProps> = async ({ uri }) => {
  const [imageUrl, setImageUrl] = useState<string>("")
  useEffect(() => {
    const getTimestampData = async()=>{
      const response = await fetch(uri);
      const data = await response.json();
      let imageUrl = data.image;
      // Check if data.image contains "ipfs://", then replace it with "https://ipfs.io/ipfs/"
      if (imageUrl && imageUrl.startsWith("ipfs://")) {
        imageUrl = imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
      }
      console.log("image url ", imageUrl)
      setImageUrl(imageUrl);
    }
    getTimestampData()
  })
  
  return (
    <img src={imageUrl} alt="NFT Image" className="h-80 hover:transition" />
  );
};

export default Image;
