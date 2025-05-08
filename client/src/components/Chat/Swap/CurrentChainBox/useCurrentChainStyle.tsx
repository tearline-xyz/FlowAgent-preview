import { Box, styled } from '@mui/system';

export const CurrentChainBoxRoot = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '4.4rem',
  background: '#141619',
  boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.04)',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 1rem',
  cursor: 'pointer',
  '& .SelectChatPng': {
    height: '5px',
  },
}));
export const CurrentChainLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  fontSize: '1.4rem',
  fontFamily: 'Helvetica',
  fontWeight: 400,
  wordWrap: 'break-word',
  '& img': {
    height: '2rem',
    marginRight: '0.8rem',
  },
}));
