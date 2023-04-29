import { getNetwork, switchNetwork } from "@wagmi/core";
import { getEventFactoryNetwork } from "../contracts/getAddresse";

export const trySwitchNetwork = async () => {
  const eventFactoryNetworkId: number = getEventFactoryNetwork();
  const chainIds = getNetwork().chains.map((chain) => chain.id);
  if (chainIds.includes(eventFactoryNetworkId))
    // already on the right network
    return;
  await switchNetwork({ chainId: eventFactoryNetworkId });
};
