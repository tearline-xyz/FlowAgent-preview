import { Box, styled } from '@mui/system';
export const SwapHeaderRight = styled(Box)(({ theme }) => ({
  height: '100%',
  // width: '16rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));


export const SwapHeaderRightWalletBox = styled(Box)(({ theme }) => ({
  height: '100%',
  // width: '16rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  // padding: '2px',
  '&.NotConnect': {
    '&:hover': {
      '& .NotConnectAbsolute': {
        display: 'block',
      },
    },
  },
  '&.ConnectSuccess': {
    '&:hover': {
      '& .ConnectSuccessAb': {
        display: 'block',
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    // display:'none'
    marginRight:'1rem'
  },
}));
export const SwapHeaderRowAccount = styled(Box)(({ theme }) => ({
  height: '2.5rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  background: '#191B1F',
  borderRadius: '12px',
  [theme.breakpoints.down('sm')]:{
    height: '30px',
  }
}));

export const SwapHeaderAccountBox = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '0.9rem',
  fontFamily: 'Helvetica',
  fontWeight: 700,
  wordWrap: 'break-word',
  background: 'linear-gradient(0deg, #2D2E31 0%, #3B3C40 100%)',
  borderRadius: '10px',
  padding: '0 8px',
  height: '100%',
  cursor: 'pointer',
  '& .SelectChatPng': {
    height: '0.3rem',
    marginLeft: '7px',
  },
  '& .AccountPng': {
    height: '1.5rem',
    width: '1.5rem',
    marginRight: '7px',
  },
  [theme.breakpoints.down('sm')]:{
    fontSize: '1.1rem',
    '& .AccountPng': {
      height: '1rem',
      width: '1rem',
      marginRight: '3px',
    },
  }
}));
