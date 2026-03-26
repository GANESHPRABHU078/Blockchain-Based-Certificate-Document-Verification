const fs = require("fs");
const path = require("path");

function main() {
  const artifactPath = path.join(
    __dirname,
    "..",
    "artifacts",
    "contracts",
    "CertificateRegistry.sol",
    "CertificateRegistry.json"
  );
  const outPath = path.join(
    __dirname,
    "..",
    "frontend",
    "src",
    "services",
    "CertificateRegistry.abi.json"
  );

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  fs.writeFileSync(outPath, JSON.stringify(artifact.abi, null, 2));
  console.log("ABI exported to", outPath);
}

main();
