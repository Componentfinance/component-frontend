import {IS_FTM} from '../constants/chainId.js';

export const grey = {
  50: '#f0f4f8',
  100: '#D9E2EC',
  200: '#BCCCDC',
  300: '#9FB3C8',
  600: '#486581',
  800: '#182027',
  900: '#0a0f13',
  1000: '#00010f'
}

export const primary = {
  dark: IS_FTM ? '#0A14EE' : 'rgba(255,66, 161, .8)',
  light: '#00fff3 ',
  main: IS_FTM ? '#0A14EE' : '#ff42a1',
}
