import { styled, Box } from '@mui/material';
export const DivSwapPanel = styled(Box)(({ theme }) => ({
  padding: '2rem 1.7rem',
  background: 'rgba(255, 255, 255, 0)',
  boxShadow: '10px 0px 50px 10px rgba(26, 26, 26, 0.90)',
  borderRadius: 16,
  border: '1px #2F333C solid',
  backgroundColor: '#222222',
}));
export const DivSwapPanelBox = styled(Box)(({ theme }) => ({
  boxSizing: 'border-box',
  position: 'relative',
  marginTop: '5px',
}));

export const DivExChangeBox = styled(Box)(({ theme }) => ({
  bottom: '-2rem',
  transform: 'translateX(-50%)',
  position: 'absolute',
  left: '50%',
  padding: '1rem',
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
