import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Header, Main, Sidebar } from '../components/index';
import { ethers } from 'ethers';
import { ThirdwebSDK } from '@3rdweb/sdk';

// SDK Configuration for RinkeBy Test Network

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.NEXT_PUBLIC_METAMASK_PRIVATE_KEY,
    ethers.getDefaultProvider(
      'https://goerli.infura.io/v3/43d694c06ed549f8ab9806079d1c5d3d'
    )
  )
)

const Dashboard = ({ address, connectWallet }) => {
  const [sanityTokens, setSanityTokens] = useState([]);
  const [thirdWebTokens, setThirdWebTokens] = useState([]);

  useEffect(() => {
    const getSanityAndThirdWebTokens = async () => {
    const coins = await fetch("https://s2tbkook.api.sanity.io/v2021-03-25/data/query/production?query=*%5B_type%3D%3D'coins'%5D%20%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%2C%0A%7D");

    const sanityTokens = (await coins.json()).result;

    setSanityTokens(sanityTokens);

    setThirdWebTokens(sanityTokens.map(token => sdk.getTokenModule(token.contractAddress)));
  }

    getSanityAndThirdWebTokens();
  },[])

  return (
    <Wrapper>
      <Sidebar />
      <MainContainer>
        <Header 
        walletAddress={address} 
        sanityTokens={sanityTokens} 
        thirdWebTokens={thirdWebTokens}
        connectWallet={connectWallet}
        />
        <Main 
        walletAddress={address} 
        sanityTokens={sanityTokens} 
        thirdWebTokens={thirdWebTokens}
        />
      </MainContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #0a0b0d;
  color: white;
  overflow: hidden;
`

const MainContainer = styled.div`
  flex: 1;
`

export default Dashboard
