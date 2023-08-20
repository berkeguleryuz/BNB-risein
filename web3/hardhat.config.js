require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    // defaultNetwork: "goerli",
    defaultNetwork: "bnbtestnet",
    networks: {
      hardhat: {},
      bnbtestnet: {
        url: "binance-testnet.rpc.thirdweb.com",
       accounts: [`0x${process.env.PRIVATE_KEY}`]
      }
      // goerli: {
      //  url: "goerli.rpc.thirdweb.com",
      //  accounts: [`0x${process.env.PRIVATE_KEY}`]
      // }
     },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
