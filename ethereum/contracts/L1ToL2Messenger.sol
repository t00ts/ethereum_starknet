// SPDX-License-Identifier: MIT
// See also: https://github.com/glihm/starknet-messaging-dev

pragma solidity ^0.8.0;

import "./lib/starknet/IStarknetMessaging.sol";

contract L1ToL2Messenger {

    IStarknetMessaging private _snMessaging;

    /**
       @notice Constructor.

       @param starknetCore The address of Starknet Core contract
    */
    constructor(address starknetCore) {
        _snMessaging = IStarknetMessaging(starknetCore);
    }


    /**
       @notice Sends a message to Starknet contract.

       @param contractAddress The contract's address on starknet.
       @param selector The l1_handler function of the contract to call.
       @param payload The serialized data to be sent.
    */
    function sendMessage(
        uint256 contractAddress,
        uint256 selector,
        uint256[] memory payload
    )
        external
        payable
    {
        _snMessaging.sendMessageToL2{value: msg.value}(
            contractAddress,
            selector,
            payload
        );
    }

}
