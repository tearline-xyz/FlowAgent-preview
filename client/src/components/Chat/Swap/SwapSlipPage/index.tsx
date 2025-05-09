import React, { useState } from 'react';
import { filterNumberPipe } from '~/swap/util';
import {
  CustomTextField,
  SwapSlippageItem,
  SwapSlippageRoot,
  SwapSlippageRow,
  SwapSlippageSetRow,
} from './useSwapSlippageStyle';
import { InputAdornment } from '@mui/material';
interface ISwapSlippage{
  slippage:string;
  setSlippage:React.Dispatch<React.SetStateAction<string>>
}


export default function SwapSlippage({setSlippage,slippage}:ISwapSlippage) {
  // const [value, setValue] = useState<string>('');

  const inputChange = async (e) => {
    const val: string = filterNumberPipe(
      Number(e.target.value) > 50 ? '50' : e.target.value,
      8,
      true,
    );
    setSlippage(val);
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
  // console.log('list', list);

  return (
    <SwapSlippageRoot>
      <SwapSlippageRow>Swap Slippage: {slippage}%</SwapSlippageRow>
      <SwapSlippageSetRow>
        {list.map((d: { value: number }, index) => {
          return (
            <SwapSlippageItem
              key={index}
              onClick={() => {
                setSlippage(d.value + '');
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
          value={slippage}
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
