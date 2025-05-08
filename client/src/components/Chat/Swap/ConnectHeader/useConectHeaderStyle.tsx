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
  height: '3.9rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  background: '#191B1F',
  borderRadius: '12px',
  [theme.breakpoints.down('sm')]:{
    height: '3rem',
  }
}));

export const SwapHeaderAccountBox = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '1.5rem',
  fontFamily: 'Helvetica',
  fontWeight: 700,
  wordWrap: 'break-word',
  background: 'linear-gradient(0deg, #2D2E31 0%, #3B3C40 100%)',
  borderRadius: '10px',
  padding: '0 8px',
  height: '100%',
  cursor: 'pointer',
  '& .SelectChatPng': {
    height: '0.5rem',
    marginLeft: '7px',
  },
  '& .AccountPng': {
    height: '2.4rem',
    width: '2.4rem',
    marginRight: '7px',
  },
  [theme.breakpoints.down('sm')]:{
    fontSize: '1.1rem',
    '& .AccountPng': {
      height: '1.7rem',
      width: '1.7rem',
      marginRight: '3px',
    },
  }
}));
