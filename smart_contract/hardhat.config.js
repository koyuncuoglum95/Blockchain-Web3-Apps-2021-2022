require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.2",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/TSQG1bgwY9GMxzLZ03hQ5DxX6hkzBRfO',
      accounts: [
        '4b647bb39367dfcaa6b20c3490b5f297668c08a34363a58229351cad11032a79'
      ],
    },
  },
};
