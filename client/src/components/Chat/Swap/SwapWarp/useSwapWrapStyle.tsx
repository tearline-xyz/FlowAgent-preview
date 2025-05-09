import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { calculateRem } from '~/components/Chat/Swap/SwapSlipPage/useSwapSlippageStyle';
export const DivSwapPanel = styled(Box)(({ theme }) => ({
  padding: `${calculateRem(2)}rem ${calculateRem(1.7)}rem`,
  background: 'rgba(255, 255, 255, 0)',
  boxShadow: '10px 0px 50px 10px rgba(26, 26, 26, 0.90)',
  borderRadius: 16,
  border: '1px #2F333C solid',
  backgroundColor: '#222222',
  width:'30rem'
}));
export const DivSwapPanelBox = styled(Box)(({ theme }) => ({
  boxSizing: 'border-box',
  position: 'relative',
  marginTop: '5px',
}));

export const DivExChangeBox = styled(Box)(({ theme }) => ({
  bottom: '-1rem',
  transform: 'translateX(-50%)',
  position: 'absolute',
  left: '50%',
  padding: `${calculateRem(1)}rem`,
  background: '#222429',
  borderRadius: '8px',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  zIndex: 10,
  cursor: 'pointer',
  '& img': {
    height: '12px',
  },
}));
