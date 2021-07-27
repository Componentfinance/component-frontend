import React, {useContext, useEffect, useState} from 'react';
import {TabActions, TabContainer, TabHeading} from '../../../../components/TabContainer/styled.js';
import DashboardContext from '../../context.js';
import Button from '../../../../components/Button';
import {FarmTabWithdrawModal} from './FarmTabWithdrawModal';
import {FarmTabDepositModal} from './FarmTabDepositModal';
import Spinner from '../../../../components/Spiner/Spinner.js';
import styled from 'styled-components';
import {currentTxStore} from '../../../../store/currentTxStore.js';

const FarmParams = styled.table`
  margin: 0 auto;
  font-size: 20px;
  td {
    &:first-child {
      padding-right: 30px;
      @media screen and (min-width: 512px) {
        padding-right: 80px;
      }
    }
    span {
      font-weight: bold;
    }
  }
  tr:not(:last-child) {
    td {
      padding-bottom: 20px;
    }
  }
`

export function FarmTab({farmAddress, type}) {
  const [loading, setLoading] = useState(true)
  const [farm, setFarm] = useState(null)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [showDepositModal, setShowDepositModal] = useState(false)

  const {
    state,
    loggedIn,
    selectWallet,
  } = useContext(DashboardContext)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const address = farmAddress || queryParams.get('address')
    if (address && state.get('farming') && state.get('farming')[type]) setFarm(state.get('farming')[type][address]);
    setLoading(false)
  }, [state, farmAddress])

  const apr = farm ? (isNaN(farm.apr) ? `${farm.apr}` : `APR: ${farm.apr}%`) : ''

  return (
    <TabContainer>
      {loading ? <Spinner /> : farm ? (
        <>
          {showWithdrawModal && (
            <FarmTabWithdrawModal
              onDismiss={() => setShowWithdrawModal(false)}
              farm={farm}
            />
          )}
          {showDepositModal && (
            <FarmTabDepositModal onDismiss={() => setShowDepositModal(false)} farm={farm} />
          )}
          <TabHeading>{farm.name} <span>(APR: {farm.apr}%)</span></TabHeading>
          <FarmParams>
            <tbody>
              <tr>
                <td><span>TVL</span><br />{farm.totalLockedValue.display}</td>
                <td><span>Deposited</span><br />{farm.userLockedValue.display}</td>
              </tr>
              <tr>
                <td><span>Available to deposit</span><br />{farm.underlyingBalance.display}</td>
                <td><span>Claimable</span><br />{farm.CMPEarned.display}</td>
              </tr>
            </tbody>
          </FarmParams>
          <TabActions>
            {loggedIn &&
              <Button
                fullWidth
                onClick={() => setShowDepositModal(true)}
              >
                Deposit
              </Button>
            }
            {loggedIn && farm.CMPEarned.numeraire.gt(0) &&
                <Button
                  fullWidth
                  onClick={() => currentTxStore.setCurrentTx(() => farm.claim)}
                >Claim</Button>
              }
            {loggedIn && farm.userLockedValue?.numeraire.gt(0) &&
                <Button
                  outlined
                  fullWidth
                  onClick={() => setShowWithdrawModal(true)}
                >Withdraw</Button>
              }
            {!loggedIn && <Button onClick={selectWallet} fullWidth>Connect</Button>}
          </TabActions>
        </>
      ) : (
        <TabHeading>Unknown farm address</TabHeading>
      )}
    </TabContainer>
  )
}
