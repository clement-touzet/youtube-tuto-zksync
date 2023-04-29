// Sources flattened with hardhat v2.13.0 https://hardhat.org

// File contracts/EventFactory.sol

//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

contract EventFactory {
    address owner;
    uint256 eventId = 1;

    event EventCreated(
        address organizer,
        uint256 indexed id,
        string indexed name,
        string description,
        uint256 indexed date,
        uint256 ticketPrice
    );

    struct Event {
        address organizer;
        uint256 id;
        string name;
        string description;
        uint256 date;
        uint256 ticketPrice;
    }

    mapping(uint256 => Event) events;
    uint256[] eventIds;

    constructor() {
        owner = msg.sender;
    }

    function createEvent(
        string memory _name,
        string memory _description,
        uint256 _date,
        uint256 _ticketPrice
    ) public {
        Event memory newEvent = Event({
            organizer: msg.sender,
            id: eventId,
            name: _name,
            description: _description,
            date: _date,
            ticketPrice: _ticketPrice
        });

        events[eventId] = newEvent;
        eventIds.push(eventId);
        eventId++;
    }

    function getEvent(uint256 _id) public view returns (Event memory) {
        return events[_id];
    }

    function getEventIds() public view returns (uint256[] memory) {
        return eventIds;
    }
}
