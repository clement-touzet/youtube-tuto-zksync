"use client";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

// wagmi
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { zkSyncTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { localhostZkSync } from "@/features/wagmiChains/l2LocalZkSync";

//raimbow kit
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { CacheProvider } from "@chakra-ui/next-js";

const { chains, provider } = configureChains(
  [zkSyncTestnet, localhostZkSync],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "TickOnBoo",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const GlobalConfig = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default GlobalConfig;
