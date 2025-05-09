import { useEffect, useState } from 'react';
import { filterNumberPipe } from '~/swap/util';
import {
  CustomTextField,
  SwapSlippageItem,
  SwapSlippageRoot,
  SwapSlippageRow,
  SwapSlippageSetRow,
} from './useSwapSlippageStyle';
import { InputAdornment } from '@mui/material';

export default function SwapSlippage() {
  const [value, setValue] = useState<string>('');

  const inputChange = async (e) => {
    const val: string = filterNumberPipe(
      Number(e.target.value) > 50 ? '50' : e.target.value,
      8,
      true,
    );
    setValue(val);
  };

  //   useEffect(() => {
  //     setValue(swapStore.customSlippage + '');
  //     return () => {};
  //   }, []);
  const list = [
    {
      value: 0.1,
    },
    {
      value: 0.5,
    },
    {
      value: 1,
    },
  ];
  console.log('list', list);

  return (
    <SwapSlippageRoot>
      <SwapSlippageRow>Swap Slippage: {value}%</SwapSlippageRow>
      <SwapSlippageSetRow>
        {list.map((d: { value: number }, index) => {
          return (
            <SwapSlippageItem
              key={index}
              onClick={() => {
                setValue(d.value + '');
              }}
            >
              {d.value}%
            </SwapSlippageItem>
          );
        })}
        {/*<SwapSlippageItem>*/}
        {/*  0.1%*/}
        {/*</SwapSlippageItem>*/}
        {/*<SwapSlippageItem>*/}
        {/*  0.5%*/}
        {/*</SwapSlippageItem>*/}
        {/*<SwapSlippageItem>*/}
        {/*  1%*/}
        {/*</SwapSlippageItem>*/}
        <CustomTextField
          value={value}
          onChange={inputChange}
          //   onBlur={onBlur}
          placeholder={'0.1-50'}
          InputProps={{
            endAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
        />
      </SwapSlippageSetRow>
    </SwapSlippageRoot>
  );
}
