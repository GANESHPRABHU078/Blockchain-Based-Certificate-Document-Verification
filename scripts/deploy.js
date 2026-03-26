const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with wallet:", deployer.address);

  const Factory = await hre.ethers.getContractFactory("CertificateRegistry");
  const contract = await Factory.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("CertificateRegistry deployed:", address);
  console.log("Network:", hre.network.name);
  console.log("Update backend env with:");
  console.log(`CONTRACT_ADDRESS=${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
