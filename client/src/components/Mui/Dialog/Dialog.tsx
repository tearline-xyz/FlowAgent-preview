
import {DialogComponents} from '~/components/Mui/Dialog/useDialogStyle';
import { DialogProps } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import classNames from 'classnames';
import {getImageUrl} from '~/swap/util/image-url';

interface IDialogProps extends DialogProps {
  title?: string;
  bodyHeight?: number;
  actions?: React.ReactNode;
  showClose?: boolean;
  close?: () => void;
  className?: string;
  classes?:any;
  dialogContentClass?: string;
  hiddenTitle?:boolean
}

export default function Dialog({
                                 dialogContentClass,
                                 className,
                                 children,
                                 title,
                                 bodyHeight,
                                 actions,
                                 showClose,
                                 close,
                                 hiddenTitle,
                                 classes,
                                 ...resProps
                               }: IDialogProps) {
  return (
    <DialogComponents
      {...resProps}
      classes={{
        root: 'DialogComponents-Root',
        ...classes
      }}
      className={classNames(className)}
    >



      {
        !hiddenTitle&& <DialogTitle
          sx={
            {
              padding: '0 0 2rem 0',
              fontSize: '1.8rem',
              color: '#ffffff',
              // fontFamily: 'Helvetica',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              // Select a Token
              fontFamily: 'Helvetica Neue',
              fontWeight: 700,
              wordWrap: 'break-word',
              '& .ClosePng': {
                position: 'absolute',
                right: 0,
                top: '0',
                height: '3rem',
                cursor: 'pointer',
                zIndex: 120,
              },
            }
          }
        >
          {title}
          {showClose && (
            <img
              onClick={() => close && close()}
              className={'ClosePng'}
              src={getImageUrl('swap/close.png')}
              alt=''
            />
          )}
        </DialogTitle>
      }
      <DialogContent
        sx={{
          padding: 0,
          height: bodyHeight ? bodyHeight + 'rem' : 'auto',
          overflowX: 'hidden',
        }}
        className={classNames(dialogContentClass)}
      >
        {children}
      </DialogContent>
      {actions && (
        <DialogActions
          sx={{
            padding: actions ? 0 : 0,
          }}
        >
          {actions}
        </DialogActions>
      )}

      {/*<DialogBody>*/}

      {/*  */}
      {/*</DialogBody>*/}
    </DialogComponents>
  );
}
