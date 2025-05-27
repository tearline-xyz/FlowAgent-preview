import { Box, styled } from '@mui/system';
import { InputBase } from '@mui/material';
import { getImageUrl } from '~/swap/util/image-url';
import { calculateRem } from '~/components/Chat/Swap/SwapSlipPage/useSwapSlippageStyle';
export const SwapPanelInputBoxRoot = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: '#141619',
  padding: '1rem 0.77rem',
  borderRadius: '12px',
}));
export const SwapPanelRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${calculateRem(0.5)}rem 0`,
}));
export const SwapPanelFlexCenter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'between',
  cursor: 'pointer',
  '& .logo': {
    width: `${calculateRem(1.4)}rem`,
    height: `${calculateRem(1.4)}rem`,
    marginRight: `${calculateRem(0.4)}rem`,
  },
  '& .logoBig': {
    width: `${calculateRem(2)}rem`,
    height: `${calculateRem(2)}rem`,
    borderRadius: '50%',
    marginRight: '0.3rem',
  },
}));
export const SwapPanelFlexCenterBg = styled(SwapPanelFlexCenter)(({ theme }) => ({
  backgroundColor: '#222429',
  padding: '0.5rem 3.3rem 0.5rem 0.7rem',
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
  fontSize: `${calculateRem(1.4)}rem`,
  fontFamily: 'Helvetica',
  fontWeight: 400,
  wordWrap: 'break-word',
  paddingRight: '6px',
}));
export const SwapPanelChain = styled(Box)(({ theme }) => ({
  color: 'white',
  fontSize: `${calculateRem(1.4)}rem`,
  fontFamily: 'Helvetica',
  fontWeight: 400,
  wordWrap: 'break-word',
  cursor: 'pointer',
}));
export const SwapPanelToken = styled(Box)(({ theme }) => ({
  color: 'white',
  fontSize: `${calculateRem(1.6)}rem`,
  fontFamily: 'Helvetica',
  fontWeight: 400,
  wordWrap: 'break-word',
  cursor: 'pointer',
}));
export const BalanceBox = styled(Box)(({ theme }) => ({
  color: '#A2A2A2',
  fontSize: `${calculateRem(1.4)}rem`,
  fontFamily: 'Helvetica',
  fontWeight: 400,
  wordWrap: 'break-word',
  paddingRight: '0.5rem',
}));
export const MaxBox = styled(Box)(({ theme }) => ({
  fontSize: `${calculateRem(1.4)}rem`,
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
  fontSize: `${calculateRem(1.37)}rem`,
  fontFamily: 'Helvetica',
  fontWeight: 300,
  wordWrap: 'break-word',
}));
export const DivSwapPanelInputBox = styled(InputBase)(({ theme }) => ({
  flex: 1,
  '& > input': {
    textAlign: 'right',
    color: 'white',
    fontSize: `${calculateRem(3.6)}rem`,
    fontFamily: 'Helvetica',
    fontWeight: 400,
    lineHeight: `${calculateRem(3.6)}rem`,
    height: `${calculateRem(3.1)}rem`,
    padding: 0,
    wordWrap: 'break-word',
    '&.Mui-disabled': {
      '-webkit-text-fill-color': 'rgba(245, 244, 240, 0.5)',
      cursor: 'default',
    },
  },
}));
