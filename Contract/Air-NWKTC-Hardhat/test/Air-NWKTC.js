const {
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  describe("AirNWKTC", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployAirNWKTCFixture() {
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount, initialOwner] = await ethers.getSigners();
  
      const AirNWKTC = await ethers.getContractFactory("AirNWKTC");
      const airNWKTC = await AirNWKTC.deploy(initialOwner.address);
  
      return { airNWKTC, owner, otherAccount };
    }
  
  describe("Deployment", function () {
      const testAddress = "0xdD870fA1b7C4700F2BD7f44238821C26f7392148";

      it("Add Instructor", async function () {
            const { airNWKTC, owner } = await loadFixture(deployAirNWKTCFixture);

            // Add instructor using test address
            await airNWKTC.addInstructor(testAddress);

            // Check if the instructor exists
            const checkPoints = await airNWKTC.checkPoints();
            expect(checkPoints).to.equal(0);
       });

      it("Add Points to Wallet", async function () {
            const { airNWKTC, owner } = await loadFixture(deployAirNWKTCFixture);

            // Add instructor using test address
            await airNWKTC.addInstructor(testAddress);

            // Add points to the instructor's wallet
            // 150 is a test amount
            await airNWKTC.addPointsToWallet(150);

            // Check if points were added correctly
            await airNWKTC.checkInstructorsPoints(testAddress);
            const updatedPoints = await airNWKTC.checkPoints();
            expect(updatedPoints).to.equal(150);
        });

      it("Check Instructor's Points", async function () {
            const { airNWKTC, owner } = await loadFixture(deployAirNWKTCFixture);

            // Add instructor using test address
            await airNWKTC.addInstructor(testAddress);

            // Add points to the instructor's wallet
            // 100 is a test amount
            await airNWKTC.addPointsToWallet(100);

            // Check if points were added correctly
            await airNWKTC.checkInstructorsPoints(testAddress);
            const updatedPoints = await airNWKTC.checkPoints();
            expect(updatedPoints).to.equal(100);
      });

  });

});
  