import { Box, styled } from '@mui/system';
import {calculateRem} from '~/components/Chat/Swap/SwapSlipPage/useSwapSlippageStyle';

export const CurrentChainBoxRoot = styled(Box)(({ theme }) => ({
  width: '100%',
  height: `${calculateRem(4.4)}rem`,
  background: '#141619',
  boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.04)',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `0 ${calculateRem(1)}rem`,
  cursor: 'pointer',
  '& .SelectChatPng': {
    height: '5px',
  },
}));
export const CurrentChainLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  fontSize: `${calculateRem(1.4)}rem`,
  fontFamily: 'Helvetica',
  fontWeight: 400,
  wordWrap: 'break-word',
  '& img': {
    height: `${calculateRem(2)}rem`,
    marginRight: '0.8rem',
  },
}));
