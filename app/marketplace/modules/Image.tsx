"use client";

import React from "react";

type ImageProps = {
  uri: string;
};

const Image: React.FC<ImageProps> = async ({ uri }) => {
  const response = await fetch(uri);
  const data = await response.json();
  let imageUrl = data.image;

  return (
    <img src={imageUrl} alt="NFT Image" className="h-80 hover:transition" />
  );
};

export default Image;
