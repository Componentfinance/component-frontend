import React from 'react'
import {IS_FTM} from '../../constants/chainId.js';

const spinning = (
  <svg version="1.1" viewBox="0 0 32 32" width="28px" height="28px" fill={IS_FTM ? '#0A14EE' : 'rgb(255,66,161)'}>
    <path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4" />
    <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 16 16"
        to="360 16 16"
        dur="0.8s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
)

export const Spinner = () => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
    {spinning}
    Loading...
  </div>
)

export default Spinner
