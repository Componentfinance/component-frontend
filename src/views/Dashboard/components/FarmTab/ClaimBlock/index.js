import React from 'react';
import {currentTxStore} from '../../../../../store/currentTxStore.js';
import {TabActions} from '../../../../../components/TabContainer/styled.js';
import Button from '../../../../../components/Button';
import BN from '../../../../../utils/BN.js';
import {LockingUserParam} from '../LockingTab/LockingBlock/styled.js';

export const ClaimBlock = ({ claimableCMP, lockingStore }) => {

  function claim() {
    currentTxStore.setCurrentTx(() => lockingStore.claim)
  }

  return (
    <>
      <LockingUserParam style={{marginTop: '40px'}}>
        <b>Earned:</b>
        <span>{claimableCMP.display} CMP</span>
      </LockingUserParam>
      <div>
        <TabActions>
          <Button
            primary
            fullWidth
            disabled={BN(claimableCMP.raw).lte(0)}
            onClick={claim}
          >
            Claim
          </Button>
        </TabActions>
      </div>
    </>
  )
}
