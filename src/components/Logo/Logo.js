import React from 'react'
import styled from 'styled-components'
import {IS_FTM} from '../../constants/chainId.js';

const StyledLogo = styled.div`
  align-items: center;
  display: flex;
  font-size: 24px;
  font-weight: 700;
  margin-right: auto;
  cursor: pointer;
  @media screen and (max-width: 512px) {
    margin-left: 5px;
  }
`

const StyledName = styled.span`
  color: ${IS_FTM ? '#fff' : 'rgb(0,0,0)'};
  margin-top: -.15em;
  margin-left: .6em;
  font-size: 1.2em;
  @media screen and (max-width: 340px) {
    display: none;
  }
`

export default function ({onClick}){
  return (
    <StyledLogo onClick={onClick}>
      <StyledName>component</StyledName>
    </StyledLogo>
  )
}
