import { expect } from "chai";
import { Wallet, Provider, Contract } from "zksync-web3";
import { rich_wallet } from "./utils/rich-wallets";
import { deployEventFactory } from "./utils/deploy";
import "@matterlabs/hardhat-zksync-chai-matchers";
import { getEnvVariable } from "../deploy/deploy";

const dev_pk1: string = rich_wallet[0].privateKey;
const dev_pk2: string = rich_wallet[1].privateKey;
const dev_pk3: string = rich_wallet[2].privateKey;
const dev_pk4: string = rich_wallet[3].privateKey;
const dev_pk5: string = rich_wallet[4].privateKey;

const dev_addr1: string = rich_wallet[0].address;
const dev_addr2: string = rich_wallet[1].address;
const dev_addr3: string = rich_wallet[2].address;
const dev_addr4: string = rich_wallet[3].address;
const dev_addr5: string = rich_wallet[4].address;

let provider: Provider;
let wallet: Wallet;
let user1: Wallet;
let user2: Wallet;

let eventFactory: Contract;

before(async () => {
  provider = Provider.getDefaultProvider(); // localhost
  console.log("provider:", provider);
  wallet = new Wallet(dev_pk1, provider);
  user1 = new Wallet(dev_pk1, provider);
  user2 = new Wallet(dev_pk2, provider);
  eventFactory = await deployEventFactory(wallet);
  console.log(`Deployed in ${eventFactory.address}`);
});

describe("EventFactory", function () {
  // 1. faire la fonction de déployement ici

  //2 dans un describe, utiliser loadFixture(fonctionDeDeployement ) https://hardhat.org/hardhat-runner/docs/getting-started#testing-your-contracts

  describe("Deploy contract", () => {
    it("Contract should be deployed", async () => {
      expect(eventFactory.address).to.not.be.undefined;
    });
  });
  describe("Event creation", () => {
    it("Should be able to create an event", async () => {
      await expect(
        eventFactory
          .connect(user1)
          .createEvent("eventTest1", "descTest1", 1679733307021, 100)
      )
        .to.emit(eventFactory, "EventCreated")
        .withArgs(dev_addr1, 1, "eventTest1", "descTest1", 1679733307021, 100);
    });
    it("Should have 1 event created", async () => {
      expect((await eventFactory.getEventIds()).length).to.equal(1);
    });
    it("Should be able to create another event on another account", async () => {
      await expect(
        eventFactory
          .connect(user2)
          .createEvent("event2", "desc2", 1679733309021, 120)
      )
        .to.emit(eventFactory, "EventCreated")
        .withArgs(dev_addr2, 2, "event2", "desc2", 1679733309021, 120);
    });
    it("Should have 2 events created", async () => {
      expect((await eventFactory.getEventIds()).length).to.equal(2);
    });
  });
  describe("Getting events", () => {
    it("Should be able to get one event's data", async () => {
      const event = await eventFactory.getEvent(1);
      expect(event.id).to.equal(1);
      expect(event.date).to.equal(1679733307021);
    });
  });
});
