import { Dialog, Box } from '@mui/material';
import {styled} from '@mui/system';

export const DialogComponents = styled(Dialog)(({ theme }) => ({
  '&.DialogComponents-Root': {
    '&.loginModal': {
      backdropFilter: 'blur(10px)',
      transition: 'opacity .5s',
      '& .MuiDialog-paper': {
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
      },
    },

    '&.MuiDialog-root': {
      zIndex: '110',
    },
    '& .dialogContentHistory': {
      overflowY: 'hidden',
      overflowX: 'hidden',
    },

    '& .MuiDialog-container': {
      [theme.breakpoints.down('sm')]: {
        alignItems: 'flex-end',
      },
    },
    '&.connectWallet': {
      '& .MuiDialog-paper': {
        [theme.breakpoints.down('sm')]: {
          width: '40rem',
        },
        [theme.breakpoints.up('sm')]: {
          width: '40rem',
        },
        [theme.breakpoints.up('lg')]: {
          width: '40rem',
        },
      },
    },
    '&.history': {
      '& .MuiDialog-paper': {
        padding: '2.4rem 0',
        [theme.breakpoints.down('sm')]: {
          width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
          width: '70rem',
        },
        [theme.breakpoints.up('lg')]: {
          width: '75rem',
        },
      },
    },
    '&.leadboard': {
      '& .MuiDialog-paper': {
        background: '#171717',
        [theme.breakpoints.down('sm')]: {
          width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
          width: '102rem',
        },
        [theme.breakpoints.up('lg')]: {
          width: '107rem',
        },
      },
    },
    '&.OrderListDialog': {
      '& .MuiDialog-paper': {
        background: '#171717',
        // paddingLeft: '3.3rem',
        [theme.breakpoints.down('sm')]: {
          width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
          width: '52.7rem',
          // height: '92.8rem',
        },
        [theme.breakpoints.up('lg')]: {
          width: '57.7rem',
          // height: '92.8rem',
        },
      },
    },
    '&.ChatSwapDialog': {
      '& .MuiDialog-paper': {
        background: 'transparent',
        height: 'auto',
        boxShadow: 'none',
        borderRadius: 0,
        border: 'none',
        padding: 0,
        '&.MuiDialog-paper': {
          maxWidth: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          maxWidth: '93rem',
        },
        [theme.breakpoints.up('sm')]: {
          width: '100%',
          maxWidth: '93rem',
        },
        [theme.breakpoints.up('lg')]: {
          width: '100%',
          maxWidth: '93rem',
        },
      },
    },
    '&.SwapSuccess': {
      '& .MuiDialog-paper': {
        padding: '1.5rem',
      },
    },
    '&.SearchToken': {
      '& .MuiDialog-paper': {
        padding: '1.25rem',
      },
      '& .MuiTypography-root': {
        margin: ' 1.05rem 0 0 1.2rem',
      },
    },
    '&.pay': {
      '& .MuiDialog-paper': {
        boxShadow: '10px 0px 50px 10px rgba(26, 26, 26, 0.90)',
        borderRadius: '16px',
        padding: '2.1rem',
        [theme.breakpoints.down('sm')]: {
          width: '39.9rem',
        },
        [theme.breakpoints.up('sm')]: {
          width: '39.9rem',
        },
        [theme.breakpoints.up('lg')]: {
          width: '39.9rem',
        },
      },
    },
    '&.earnModal': {
      '& .MuiDialog-container': {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingLeft: '3.5rem',
      },
      '& .MuiDialog-paper': {
        boxShadow: 'none',
        borderRadius: '16px',
        padding: 0,
        marginBottom: '1.5rem',
        [theme.breakpoints.down('sm')]: {
          width: 'auto',
          marginLeft: '-30px',
        },
        [theme.breakpoints.up('sm')]: {
          width: 'auto',
        },
        [theme.breakpoints.up('lg')]: {
          width: 'auto',
        },
      },
    },
    '&.addTips': {
      background: 'transparent',
      '& .MuiDialog-paper': {
        background: 'transparent',
        boxShadow: 'none',
        border: 'none',
        [theme.breakpoints.down('sm')]: {
          width: 'auto',
        },
        [theme.breakpoints.up('sm')]: {
          width: 'auto',
        },
        [theme.breakpoints.up('lg')]: {
          width: 'auto',
        },
      },
    },
    '&.dialogpd0': {
      '& .MuiDialog-paper': {
        padding: '2.4rem 2.4rem 0 2.4rem',
      },
    },
    '& .MuiDialog-paper': {
      margin: 0,
      background: '#212121',
      height: 'auto',
      boxShadow: '10px 0px 50px 10px rgba(26, 26, 26, 0.90)',
      borderRadius: '16px',
      border: '1px #2F333C solid',
      padding: '2.4rem',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.up('sm')]: {
        width: '45rem',
      },
      [theme.breakpoints.up('lg')]: {
        width: '50rem',
      },
    },
  },
}));

export const DialogBody = styled(Box)(({ theme }) => ({
  padding: '24px',
  minWidth: '10rem',
  minHeight: '10rem',
  background: '#272727',
  borderRadius: '1.6rem',
  border: '1px rgba(255, 255, 255, 0.10) solid',
  margin: '0 auto',
}));
