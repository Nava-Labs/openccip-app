"use client";

import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiConfig, createConfig, sepolia } from "wagmi";
import * as React from "react";
import localFont from "next/font/local";
import Avatar from "@/app/components/Avatar";
import {
  avalancheFuji,
  baseGoerli,
  bscTestnet,
  optimismGoerli,
  polygonMumbai,
} from "viem/chains";

const myFont = localFont({ src: "../public/font/conthrax-sb.otf" });

const chains = [
  sepolia,
  optimismGoerli,
  polygonMumbai,
  avalancheFuji,
  bscTestnet,
  baseGoerli,
];

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID ?? "",
    // Required
    appName: "Crosslink",
    chains,
  })
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        options={{
          embedGoogleFonts: true,
          overlayBlur: 12,
          customAvatar: Avatar,
        }}
        customTheme={{
          //NOTE: Read all available config here: https://github.com/family/connectkit/blob/main/packages/connectkit/src/styles/themes/midnight.ts

          "--ck-primary-button-border-radius": 10,
          "--ck-font-family": myFont.style.fontFamily,
          "--ck-border-radius": "var(--radius)",
        }}
      >
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
