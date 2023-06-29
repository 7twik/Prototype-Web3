module.exports = {
    contracts_build_directory: "../client/src/contracts/",
    networks: {
      develop: {
        port:8545,
      },
    },
    compilers: {
      solc: {
        version: "0.8.18",      // Fetch exact version from solc-bin (default: truffle's version)
      },
    },
  }