// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.2/access/Ownable.sol";

contract AirNWKTC is Ownable {
    address private newInstructor;
    address private existingAddress;
    address private pointsAddress;
    uint private newPoints;
    uint public checkPoints;
    bool private instructorExists = false;

    struct Loyalty {
        PointsTracker[] instructors;
    }

    struct PointsTracker {
        address instructor;
        uint points;
    }

    Loyalty private loyaltyTrack;

    function addInstructor(address instructorsAddress) public onlyOwner {
        instructorExists = false;  // Reset instructorExists to false for each call
        // Check if the instructor already exists
        for (uint i = 0; i < loyaltyTrack.instructors.length; i++) {
            if (loyaltyTrack.instructors[i].instructor == instructorsAddress) {
                instructorExists = true;
                existingAddress = instructorsAddress;
                break;
            }
        }

        // If the instructor does not exist, add them
        if (!instructorExists) {
            newInstructor = instructorsAddress;
        }

        pointsAddress = instructorExists ? existingAddress : newInstructor;
    }

    function addPointsToWallet(uint points) public onlyOwner {
        if (instructorExists) {
            // Find the points of the pointsAddress and add the new points to it
            for (uint i = 0; i < loyaltyTrack.instructors.length; i++) {
                if (loyaltyTrack.instructors[i].instructor == pointsAddress) {
                    loyaltyTrack.instructors[i].points += points;
                    return;
                }
            }
        } else {
            newPoints = points;
            PointsTracker memory loyaltyInstructorPoints;
            loyaltyInstructorPoints.instructor = newInstructor;
            loyaltyInstructorPoints.points = newPoints;
            loyaltyTrack.instructors.push(loyaltyInstructorPoints);
        }
    }

    function checkInstructorsPoints (address check) public onlyOwner {
        for (uint i = 0; i < loyaltyTrack.instructors.length; i++) {
            if (loyaltyTrack.instructors[i].instructor == check) {
                // Find the points of the pointsAddress and add the new points to it
                for (uint b = 0; b < loyaltyTrack.instructors.length; b++) {
                    if (loyaltyTrack.instructors[b].instructor == pointsAddress) {
                        checkPoints = loyaltyTrack.instructors[b].points;
                        return;
                    }
                }
                break;
            }
        }
    }

    constructor(address initialOwner) Ownable(initialOwner) {}
}
