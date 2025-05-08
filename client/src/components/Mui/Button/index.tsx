import { useCallback } from 'react';
import Spinner from '~/components/Mui/Spinner';
import { ButtonBox } from '~/components/Mui/Button/useButtonStyle';
import classNames from 'classnames';
import { Box } from '@mui/material';
import { ButtonProps } from '@mui/material';

interface IButtonProps extends ButtonProps {
  rounded?: boolean;
  loading?: boolean;
  isStopPropagation?: boolean;
  className?: any;
  children: any;
  onClick?: (e: any) => void;
  width?: number;
  height?: number;
  style?: any;

  [x: string]: any;

  // showLoadingText?: boolean;
  // buttonText?: boolean;
  hiddenLoadingText?: boolean;
  loadingColor?: string;
}

const Button = ({
                  children,
                  loading,
                  onClick,
                  isStopPropagation,
                  className,
                  width = 100,
                  height = 41.6,
                  style,
                  // showLoadingText = true,
                  // buttonText = false,
                  hiddenLoadingText = false,
                  loadingColor = 'black',
                  ...restProps
                }: IButtonProps) => {
  const onLoadingClick = useCallback((e: any) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);
  return (
    <ButtonBox
      {...restProps}
      style={style}
      className={classNames(className, loading && 'loading')}
      onClick={
        loading
          ? onLoadingClick
          : e => {
            if (isStopPropagation) {
              e.stopPropagation();
            }
            onClick?.(e);
          }
      }
    >
      {!loading && <Box className={classNames('content')}>{children}</Box>}
      {loading && (
        <>
          <Spinner color={loadingColor} />
          {hiddenLoadingText && children}
          {!hiddenLoadingText && <span>Loading...</span>}
        </>
      )}
    </ButtonBox>
  );
};

export default Button;
