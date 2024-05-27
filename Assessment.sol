// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract MusicServices {
    uint256 public constant PRICE_MUSIC_VIDEO_SHOOT = 3000;
    uint256 public constant PRICE_MUSIC_VIDEO_PROMOTION = 1500;
    uint256 public constant PRICE_BOTH_SERVICES = 4000;

    enum ServiceType { NONE, VIDEO_SHOOT, VIDEO_PROMOTION, BOTH }

    function getPrice(ServiceType service) external pure returns (uint256) {
        if (service == ServiceType.VIDEO_SHOOT) {
            return PRICE_MUSIC_VIDEO_SHOOT;
        } else if (service == ServiceType.VIDEO_PROMOTION) {
            return PRICE_MUSIC_VIDEO_PROMOTION;
        } else if (service == ServiceType.BOTH) {
            return PRICE_BOTH_SERVICES;
        } else {
            revert("Invalid service type");
        }
    }
}
