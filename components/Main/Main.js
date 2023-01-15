import React from 'react'
import styled from 'styled-components'
import Portfolio from '../Portfolio/Portfolio'
import Promos from '../Promos/Promos'

const Main = ({ thirdWebTokens, sanityTokens, walletAddress }) => {
  return (
    <Wrapper>
        <Portfolio thirdWebTokens={thirdWebTokens} sanityTokens={sanityTokens} walletAddress={walletAddress}/>
        <Promos />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  max-height: calc(100vh - 64px);
  overflow: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  & div {
      border-radius: 0.4rem;
  }
`

export default Main