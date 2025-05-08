
import { Box,styled } from '@mui/system';
import {getImageUrl} from '~/swap/util/image-url';

export const NotConnectAbsolute = styled(Box)(({ theme }) => ({
  width: '25rem',
  position: 'absolute',
  top: '100%',
  right: 0,
  boxShadow: '10px 0px 50px 10px rgba(26, 26, 26, 0.90)',
  borderRadius: '16px',
  padding: '24px 22px',
  border: '1px #2F333C solid',
  backgroundColor: '#222222',
  zIndex: 120,
  display: 'none',
  '&.Block': {
    position: 'initial',
    display: 'block',
    boxShadow: 'initial',
    backgroundColor: 'initial',
    padding: '0',
    border: 'none',
    '& .NotTitle': {
      display: 'none',
    },
  },
  '&.Width100': {
    width: '100%',
  },
  [theme.breakpoints.down('sm')]:{
    width: '100%',
    maxWidth:'32rem',
    padding: '1.6rem',
  }
}));

export const WalletTypeBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
export const WalletTypeBoxLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
}));
export const WalletTypeName = styled(Box)(({ theme }) => ({
  color: 'black',
  fontSize: '0.7rem',
  fontFamily: 'Helvetica Neue',
  fontWeight: 500,
  lineHeight: '0.7rem',
  wordWrap: 'break-word',
  whiteSpace: 'nowrap',
  '&.SolName': {
    color: '#ffffff',
  },
  '&.payNumber': {
    fontSize: '0.7rem',
    lineHeight: '0.7rem',
    letterSpacing: '0.2px',
  },
  [theme.breakpoints.down('sm')]:{
    fontSize: '0.8rem',
  }
}));
export const WalletTypeFullName = styled(Box)(({ theme }) => ({
  color: '#575757',
  fontSize: '0.8rem',
  fontFamily: 'Helvetica Neue',
  fontWeight: 400,
  lineHeight: '0.8rem',
  wordWrap: 'break-word',
  whiteSpace: 'nowrap',
  paddingTop: '0.3rem',
  '&.SolFullName': {
    color: '#575757',
  },
  [theme.breakpoints.down('sm')]:{
    fontSize: '1rem',
    lineHeight: '1rem',
  }
}));
export const WalletTypeBoxRight = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& .text': {
    color: 'black',
    fontSize: '0.9rem',
    fontFamily: 'Helvetica Neue',
    fontWeight: 500,
    lineHeight: '0.9rem',
    wordWrap: 'break-word',
  },
  '&.SolConnect': {
    '& .text': {
      color: '#ffffff',
    },
  },
  [theme.breakpoints.down('sm')]:{
    '& .text': {
      fontSize: '0.8rem',
      lineHeight: '0.8rem',
    }
  }
}));
export const ConnectArrow = styled(Box)(({ theme }) => ({
  width: '1.2rem',
  height: '1.2rem',
  // borderRadius: '50%',
  display: 'flex',
  marginLeft: '1rem',
  backgroundImage: `url(${getImageUrl('swap/arrow-re.png')})`,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  // '&.HArrow': {
  //   backgroundImage: `url(${BgArrowPng})`,
  // },
  '& img': {
    margin: 'auto',
    width: '0.4rem',
    height: '0.3rem',
  },
  [theme.breakpoints.down('sm')]:{
    width: '0.9rem',
    height: '0.9rem',
  }
}));

export const ConnectArrowSol = styled(Box)(({ theme }) => ({
  width: '1.3rem',
  height: '1.3rem',
  // borderRadius: '50%',
  display: 'flex',
  marginLeft: '1rem',
  background: `url(${getImageUrl('swap/bg-arrow-re.svg')})`,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  '& img': {
    margin: 'auto',
    width: '1rem',
    height: '0.4rem',
  },
  [theme.breakpoints.down('sm')]:{
    width: '0.9rem',
    height: '0.9rem',
  }
}));

export const PayArrowBox = styled(Box)(({ theme }) => ({
  width: '1.3rem',
  height: '1.3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '0.7rem',

}));
export const PayArrowBg = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${getImageUrl('swap/bg-arrow-re.svg')})`,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  '& img': {
    margin: 'auto',
    width: '0.7rem',
    height: '0.3rem',
  },
  '&.black': {
    backgroundImage: `url(${getImageUrl('swap/arrow-re.png')})`,
  },
}));


export const NotTitle = styled(Box)(({ theme }) => ({
  color: 'white',
  fontSize: '0.9rem',
  fontFamily: 'Helvetica Neue',
  fontWeight: 700,
  wordWrap: 'break-word',
  paddingBottom: '1.5rem',
  [theme.breakpoints.down('sm')]:{
    paddingBottom: '1.6rem',
  }
}));
export const WalletBox = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '1rem',
  padding: '1rem',
  height: '4rem',
  background:
    'linear-gradient(352deg, #91C0F8 0%, #AED6F4 58%, #C4E7F2 86%, #C8E9F2 100%)',
  paddingLeft: '4.5rem',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '&.SolBox': {
    background: '#121212',
    marginBottom: '4px',
  },
  '&.TonBox': {
    background: '#121212',
  },
  [theme.breakpoints.down('sm')]:{
    height: '4rem',
    padding: '0.7rem',
    paddingLeft: '4rem',
  }
}));
export const WalletChainBox = styled(Box)(({ theme }) => ({
  width: '3rem',
  height: '3rem',
  borderRadius: '1.1rem',
  position: 'absolute',
  left: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&.BscBox': {
    // background: '#000000',
  },
  '&.SolChainBox': {
    background: '#233033',
  },
  '&.TonChainBox': {
    background: '#1291D1',
  },

  '& .EvmPng': {
    width: '100%',
    height: '100%',
  },
  '& .TonPng': {
    width: '1.6rem',
    height: '1.6rem',
  },
  '& .SolPng': {
    width: '2.2rem',
    height: '2.2rem',
  },
  '& .BscPng': {
    width: '2.2rem',
    height: '2.2rem',
  },
  [theme.breakpoints.down('sm')]:{
    width: '1.5rem',
    height: '1.5rem',
  }
}));

export const OtherChain = styled(Box)(({ theme }) => ({
  width: '100%',
  color: 'white',
  fontSize: '0.8rem',
  fontFamily: 'Helvetica Neue',
  fontWeight: 500,
  wordWrap: 'break-word',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '13px 0',
  '& .left': {
    width: '33%',
    height: '1px',
    background: '#393D45',
  },
  '& .right': {
    width: '33%',
    height: '1px',
    background: '#393D45',
  },
  [theme.breakpoints.down('sm')]:{
    fontSize: '0.7rem',
  }
}));
