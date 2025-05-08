import { styled } from '@mui/system';
import { Box } from '@mui/system';

export const StyledColorClip = styled(Box)(
  ({
     backgroundImage = 'linear-gradient(to right, #59D9F4 0%, #BEE867 100%)',
   }: {
    backgroundImage?: string;
  }) => ({
    backgroundClip: 'text',
    backgroundImage: backgroundImage,
    color: 'transparent',
  }),
);
export const ConnectUserInfoRoot = styled(Box)(({ theme }) => ({
  width: '25rem',
  position: 'absolute',
  top: '100%',
  right: 0,
  boxShadow: '10px 0px 50px 10px rgba(26, 26, 26, 0.90)',
  borderRadius: '16px',
  padding: '1rem',
  border: '1px #2F333C solid',
  backgroundColor: '#222222',
  zIndex: 120,
  display: 'none',
  '&.staking-cake': {
    right: 'auto',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '153px',
    backgroundColor: '#212121',
    borderRadius: '11px',
    height:'76px',
    padding:'12px 12px 6px 12px'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
export const UserBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  padding: '1rem 0',
  justifyContent: 'center',
  alignItems: 'center',
  '& img': {
    height: '3.7rem',
  },
}));
export const UserAddressBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  padding: '1rem 0 0.3rem 1rem',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: '1.4rem',
  fontFamily: 'Helvetica Neue',
  fontWeight: 700,
  lineHeight: '1.4rem',
  wordWrap: 'break-word',
}));
export const UserAddressBalance = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: '1rem',
  paddingBottom: '0.9rem',
  fontFamily: 'Helvetica Neue',
  fontWeight: 700,
  lineHeight: '1rem',
  wordWrap: 'break-word',
}));
export const DisConnectBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
  paddingBottom: '1rem',
}));
export const DisConnectBoxItem = styled(Box)(({ theme }) => ({
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#3D3E3F',
  borderRadius: '12px',
  height: '3rem',
  color: 'white',
  fontSize: '0.8rem',
  fontFamily: 'Helvetica Neue',
  fontWeight: 700,
  lineHeight: '0.8rem',
  wordWrap: 'break-word',
  cursor: 'pointer',
  '&:active': {
    '& .DisconnectPng': {
      fontSize: '0.5rem',
      transform: 'scale(.7)',
    },
    '& .CopyAddressPng': {
      fontSize: '0.5rem',
      transform: 'scale(.7)',
    },
  },
  '& .DisconnectPng': {
    width: '0.8rem',
    height: '0.8rem',
    marginBottom: '5px',
  },
  '& .CopyAddressPng': {
    width: '0.8rem',
    height: '0.8rem',
    marginBottom: '5px',
  },
}));
export const RowTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '#A3A4A5',
  fontSize: '1rem',
  fontFamily: 'Helvetica Neue',
  fontWeight: 700,
  lineHeight: '1rem',
  wordWrap: 'break-word',
  cursor: 'pointer',
  '& .OpenHistoryPng': {
    width: '1.1rem',
    height: '1.2rem',
  },
}));

export const RowLoginTitle = styled(Box)(({ theme }) => ({
  color: '#A3A4A5',
  fontSize: '1.6rem',
  fontFamily: 'Helvetica',
  fontWeight: 400,
  lineHeight: '2rem',
  wordWrap: 'break-word',
  paddingTop: '1.3rem',
}));
export const HistoryBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '10rem',
  '& .HeaderHistorySuccessPng': {
    width: '1.6rem',
    height: '1.6rem',
    marginRight: '1.5rem',
  },
  '& .OpenHistoryPng': {
    width: '1.6rem',
    height: '1.6rem',
  },
}));

export const TradeDetailBox = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  // alignItems: 'center',
}));
export const TradeDetailBoxTop = styled(Box)(({ theme }) => ({
  color: 'white',
  fontSize: '1.6rem',
  fontFamily: 'Helvetica',
  fontWeight: 400,
  lineHeight: '2rem',
  wordWrap: 'break-word',
  paddingBottom: '3px',
  maxWidth: '24.4rem',
}));

export const ColorBox = styled(StyledColorClip)(({ theme }) => ({
  backgroundImage: 'linear-gradient(to right, #CCECF1 0%, #93C2F7 100%)',
}));
export const TradeDetailBoxBottom = styled(Box)(({ theme }) => ({
  color: '#91C0F8',
  fontSize: '1.4rem',
  fontFamily: 'Helvetica',
  fontWeight: 700,
  lineHeight: '1.4rem',
  wordWrap: 'break-word',
}));
