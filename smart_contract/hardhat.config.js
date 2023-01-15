require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.2",
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/tCTOlGrrezRzQBTW-UpvXkahQI6bjE7q',
      accounts: [
        '955887c593d98ecfb763b4f05df4e018339935764d30cce3ff24d31da5fe076d',
      ],
    },
  },
};
