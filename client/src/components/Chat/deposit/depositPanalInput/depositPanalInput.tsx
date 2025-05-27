import { IServerJetton, SwapDataInfo } from '~/swap/interface';
import {
  BalanceBox,
  DivSwapPanelInputBox,
  MaxBox,
  RateBox,
  SwapPanelChain,
  SwapPanelFlexCenter,
  SwapPanelFlexCenterBg,
  SwapPanelInputBoxRoot,
  SwapPanelLabel,
  SwapPanelRow,
  SwapPanelToken,
} from './useDepositPanelInputStyle';
import { useEffect, useState } from 'react';
import { filterNumberPipe, getAssetsInfo } from '~/swap/util';
import { ToFixedPipe } from '~/swap/const/bignumber';
import { getChainLogo } from '~/swap/const/contract';
import BigNumber from 'bignumber.js';
import { axiosAggregatorQuote } from '~/swap/serve';
import SwapDialog from '../swapDialog/swapDialog';

interface DepositPanelInputBoxProps {
  inputValue: string;
  disabled: boolean;
  onChangeValue: (val: any) => void;
  type: string;
  showMax: boolean;
  jettonData: IServerJetton | null;

  // swapTokenInfo: SwapDataInfo | undefined;
  //   currentChainInfo: AllChainData | null;
}

export default function DepositPanelInputBox({
  inputValue,
  disabled,
  onChangeValue,
  type,
  showMax,
  jettonData,
  // swapTokenInfo,
  //   currentChainInfo,
}: DepositPanelInputBoxProps) {
  //   const swapStore: SwapDataStoreInterface = useAppSelector((state: RootState) => state.swapSlice);
  const [visible, setVisible] = useState<boolean>(false);

  const inputChange = async (e) => {
    if (type === 'input') {
      const val: string = filterNumberPipe(e.target.value, 12, true);
      onChangeValue && onChangeValue(val);
    }
  };

  return (
    <SwapPanelInputBoxRoot>
      <SwapPanelRow>
        {/* <SwapPanelFlexCenter onClick={openModalClick}>
          <SwapPanelLabel>{type === 'input' ? 'From' : 'To'}</SwapPanelLabel>
          <SwapPanelFlexCenter>
            <img
              className={'logo'}
              src={'https://web3.okx.com/cdn/wallet/logo/sui_17700.png'}
              alt=""
            />
            <SwapPanelChain>{'Sui'}</SwapPanelChain>
          </SwapPanelFlexCenter>
        </SwapPanelFlexCenter> */}
        <SwapPanelFlexCenter>
          <BalanceBox>Balance:{jettonData?.balance}</BalanceBox>
          {showMax && (
            <MaxBox
              onClick={() => {
                if (jettonData?.balance) {
                  if (new BigNumber(jettonData?.balance + '').isLessThanOrEqualTo(0.00000000001)) {
                    onChangeValue && onChangeValue('0');
                  } else {
                    onChangeValue && onChangeValue(jettonData?.balance + '');
                  }
                }
              }}
            >
              Max
            </MaxBox>
          )}
        </SwapPanelFlexCenter>
        {Number(jettonData?.balance) < Number(inputValue) && (
          <button
            onClick={() => {
              setVisible(true);
            }}
          >
            Swap
          </button>
        )}
      </SwapPanelRow>
      <SwapPanelRow>
        <SwapPanelFlexCenterBg>
          <img className={'logoBig'} src={jettonData?.tokenLogoUrl} alt="" />
          <SwapPanelToken>{jettonData?.tokenSymbol}</SwapPanelToken>
        </SwapPanelFlexCenterBg>
        <DivSwapPanelInputBox
          placeholder="0"
          value={inputValue}
          onChange={inputChange}
          disabled={disabled}
        />
      </SwapPanelRow>
      <RateBox>
        ≈$
        {inputValue ? ToFixedPipe(Number(inputValue) * Number(jettonData?.tokenPrice)) : ''}
      </RateBox>
      <SwapDialog toTokenJetton={jettonData} visible={visible} setVisible={setVisible} />
    </SwapPanelInputBoxRoot>
  );
}
