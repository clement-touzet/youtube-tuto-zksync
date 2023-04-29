import eventFactoryInfos from "../../../../backend/deployedContractsInfo/eventFactory.json";

export function getEventFactoryAddress(): `0x${string}` {
  return `0x${eventFactoryInfos.eventFactory.address.replace("0x", "")}`;
}

export function getEventFactoryNetwork(): number {
  return eventFactoryInfos.eventFactory.network == "test"
    ? 270 // 270 is the network id for the local network
    : 280; // 280 is the network id for the zktestnet network
}
