import { Box, styled } from '@mui/system';
import TextField from '@mui/material/TextField';
export const calculateRem=(d: number)=>d*10/16;
export const SwapSlippageRoot = styled(Box)(({ theme }) => ({
  marginBottom: `${calculateRem(2.9)}rem`,
}));
export const SwapSlippageRow = styled(Box)(({ theme }) => ({
  color: '#FAFAFA',
  fontSize: `${calculateRem(1.4)}rem`,
  fontFamily: 'Helvetica',
  fontWeight: 400,
  wordWrap: 'break-word',
  padding: '0.5rem 0 1.5rem 0',
}));

export const SwapSlippageSetRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
}));
export const SwapSlippageItem = styled(Box)(({ theme }) => ({
  color: 'rgba(255,255,255,0.92)',
  fontSize: `${calculateRem(1.4)}rem`,
  fontFamily: 'Helvetica',
  fontWeight: 400,
  wordWrap: 'break-word',
  background: '#38393E',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '6px',
  height: `${calculateRem(4)}rem`,
  padding: '0 8px',
  minWidth: `${calculateRem(4)}rem`,
  cursor: 'pointer',
}));
export const CustomTextField = styled(TextField)(({ theme }) => ({
  position: 'relative',
  '&.MuiTextField-root': {
    width: '100%',
  },

  '& .MuiInputBase-root': {
    padding: 0,
    width: `${calculateRem(12)}rem`,
    height: `${calculateRem(4)}rem`,
    borderRadius: '10px',
    letterSpacing: '-0.45px',
    border: 'none',

    background: `#151515`,

    color: '#FAFAFA',
    fontSize: `${calculateRem(1.4)}rem`,
    fontFamily: 'Helvetica',
    fontWeight: 400,
    wordWrap: 'break-word',
    transition: 'all 1s',
    '&.Mui-focused': {
      background: `#151515`,
    },
    '&:hover, &:focus': {
      background: `#151515`,
    },
    '& .MuiInputBase-input': {
      padding: '0 0 0 6px',
      // padding: '0 2rem',
      // fontFamily: 'Inter',
      // fontWeight: 400,
      // fontSize: '1.5rem',
      // color: `${theme.palette.text.primary}`,
    },
    '& .MuiTypography-root': {
      fontSize: `${calculateRem(1.4)}rem`,
      // padding: '0 2rem',
      // fontFamily: 'Inter',
      // fontWeight: 400,
      // fontSize: '1.5rem',
      // color: `${theme.palette.text.primary}`,
    },
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      display: 'none',
    },
  },
}));
