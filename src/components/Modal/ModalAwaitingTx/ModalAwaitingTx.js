import React from 'react'
import styled from 'styled-components'
import HourglassFullIcon from '@material-ui/icons/HourglassFull'

import etherscan from '../../../assets/etherscan-logo-circle.svg'
import xdai from '../../../assets/etherscan-logo-circle-xdai.svg'
import fantom from '../../../assets/etherscan-logo-circle-fantom-blue.svg'
import Loader from '../../Loader'
import Modal from '../index.js'
import ModalActions from '../ModalActions'
import ModalIcon from '../ModalIcon'
import ModalTitle from '../ModalTitle'
import {IS_BSC, IS_ETH, IS_FTM, IS_XDAI} from '../../../constants/chainId.js';

const StyledViewOnEtherscan = styled.div`
  font-size: 1.3em;
  margin-bottom: 30px;
  margin-top: 18px;
`

const AwaitingTxModal = ({ txHash }) => {

  const etherscanlink = IS_ETH
    ? `https://etherscan.io/tx/${txHash}`
    : IS_BSC
    ? `https://bscscan.com/tx/${txHash}`
    : IS_FTM
    ? `https://ftmscan.com/tx/${txHash}`
    : `https://blockscout.com/xdai/mainnet/tx/${txHash}`;

  return (
    <Modal>
      <ModalTitle> Please wait while your transaction confirms </ModalTitle>
      <ModalIcon>
        <HourglassFullIcon />
      </ModalIcon>
      {
        txHash ?  <StyledViewOnEtherscan>
          <a href={etherscanlink} style={{textDecoration:'none', color: IS_FTM ? '#000' : 'inherit'}} target="_blank" rel="noopener noreferrer">
            <img src={IS_XDAI ? xdai : IS_FTM ? fantom : etherscan} style={{margin: '-3.5px 10px', width: '1.15em'}} alt="" />
            <span>
              View On Explorer
            </span>
          </a>
        </StyledViewOnEtherscan> : null
      }
      <ModalActions>
        <div style={{ flex: 1 }}>
          <Loader />
        </div>
      </ModalActions>
    </Modal>
  )
}

export default AwaitingTxModal
