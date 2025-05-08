import { Box, styled } from '@mui/system';
import { InputBase } from '@mui/material';
// import SelectChatPng from '@src/assets/image/swap/select-swap.png';
import { getImageUrl } from '~/swap/util/image-url';

export const SwapPanelInputBoxRoot = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: '#141619',
  padding: '1.6rem',
  borderRadius: '12px',
}));
export const SwapPanelRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.5rem 0',
}));
export const SwapPanelFlexCenter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '& .logo': {
    width: '1.4rem',
    height: '1.4rem',
    marginRight: '0.4rem',
  },
  '& .logoBig': {
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    marginRight: '0.5rem',
  },
}));
export const SwapPanelFlexCenterBg = styled(SwapPanelFlexCenter)(({ theme }) => ({
  backgroundColor: '#222429',
  padding: '0.8rem 4rem 0.8rem 1rem',
  borderRadius: '10px',
  position: 'relative',
  transaction: 'all 2s',
  '&:after': {
    content: `' '`,
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '9px',
    height: '5px',
    backgroundImage: `url(${getImageUrl('/swap/select-swap.png')})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  },
  '&:active': {
    transform: 'scale(.9)',
  },
}));

export const SwapPanelLabel = styled(Box)(({ theme }) => ({
  color: '#A2A2A2',
  fontSize: '1.4rem',
  fontFamily: 'Helvetica',
  fontWeight: 400,
  wordWrap: 'break-word',
  paddingRight: '6px',
}));
export const SwapPanelChain = styled(Box)(({ theme }) => ({
  color: 'white',
  fontSize: '1.4rem',
  fontFamily: 'Helvetica',
  fontWeight: 400,
  wordWrap: 'break-word',
  cursor: 'pointer',
}));
export const SwapPanelToken = styled(Box)(({ theme }) => ({
  color: 'white',
  fontSize: '1.6rem',
  fontFamily: 'Helvetica',
  fontWeight: 400,
  wordWrap: 'break-word',
  cursor: 'pointer',
}));
export const BalanceBox = styled(Box)(({ theme }) => ({
  color: '#A2A2A2',
  fontSize: '14px',
  fontFamily: 'Helvetica',
  fontWeight: 400,
  wordWrap: 'break-word',
  paddingRight: '0.5rem',
}));
export const MaxBox = styled(Box)(({ theme }) => ({
  fontSize: '1.4rem',
  fontFamily: 'Helvetica',
  fontWeight: 400,
  color: '#ffffff',
  paddingRight: '0.5rem',
  cursor: 'pointer',
}));
export const RateBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  color: '#A2A2A2',
  fontSize: '1.37rem',
  fontFamily: 'Helvetica',
  fontWeight: 300,
  wordWrap: 'break-word',
}));
export const DivSwapPanelInputBox = styled(InputBase)(({ theme }) => ({
  flex: 1,
  '& > input': {
    textAlign: 'right',
    color: 'white',
    fontSize: '3.6rem',
    fontFamily: 'Helvetica',
    fontWeight: 400,
    lineHeight: '3.6rem',
    height: '3.1rem',
    padding: 0,
    wordWrap: 'break-word',
  },
}));
