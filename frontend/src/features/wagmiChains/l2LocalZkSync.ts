import { Chain } from "wagmi";

export const localhostZkSync = {
  id: 270,
  name: "L2 local zkSync",
  network: "ethereum",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["http://127.0.0.1:3050"] },
    default: { http: ["http://127.0.0.1:3050"] },
  },
} as const satisfies Chain;
