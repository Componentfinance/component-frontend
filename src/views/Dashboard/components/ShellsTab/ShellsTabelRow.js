import TokenIcon from '../../../../components/TokenIcon';
import BigNumber from 'bignumber.js';
import React, {useContext} from 'react';
import {ShellName, ShellNameBody, ShellNamePart, StyledBalance, StyledRow, Symbol, Weight} from './styled.js';
import DashboardContext from '../../context.js';
import {IS_FTM} from '../../../../constants/chainId.js';

export const ShellsTableRow = ({showShell, liqTotal, liqOwned, assets}) => {
  const {
    loggedIn
  } = useContext(DashboardContext)

  return (
    <StyledRow onClick={showShell}>
      <ShellName>
        <ShellNameBody>
            <ShellNamePart>
              {assets.map((asset, i) => (
                <>
                  {i !== 0 && ' '}
                  <Symbol>
                    {asset.symbol}
                  </Symbol>
                  {i !== assets.length - 1 && (<span> /</span>)}
                </>
              ))}
              <div>
                {assets.map((asset, i) => (
                  <>
                    {i !== 0 && ' '}
                    <Weight>
                      { asset.weight.multipliedBy(new BigNumber(100)).toString() + '%' }
                    </Weight>
                    {i !== assets.length - 1 && (<span style={{color: IS_FTM ? 'inherit' : 'grey'}}> /</span>)}
                  </>
                ))}
              </div>
            </ShellNamePart>
        </ShellNameBody>
      </ShellName>
      <StyledBalance
        className="number"
        style={{justifyContent: loggedIn ? 'flex-start' : 'flex-end', flex: '1.2'}}
      >
        { liqTotal }
      </StyledBalance>
      {loggedIn && (
        <StyledBalance
          className="number"
          style={{justifyContent: 'flex-start', flex: '1'}}
        >
          { liqOwned }
        </StyledBalance>
      )}
    </StyledRow>
  )
}
