require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://goerli.infura.io/v3/caa0a98960474b2082272ea2fbb8a78f', // achemy key
      accounts: ['4b647bb39367dfcaa6b20c3490b5f297668c08a34363a58229351cad11032a79'], // metamask private key
    },
  },
};