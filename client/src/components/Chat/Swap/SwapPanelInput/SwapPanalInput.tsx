import { AllChainData, IServerJetton, SwapDataInfo, TokenAssetsInterface } from '~/swap/interface';
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
} from './useSwapPanelInputStyle';
import { useEffect, useState } from 'react';
import { filterNumberPipe, getAssetsInfo } from '~/swap/util';
import { ToFixedPipe } from '~/swap/const/bignumber';
import { getChainLogo } from '~/swap/const/contract';
import BigNumber from 'bignumber.js';
interface SwapPanelInputBoxProps {
  inputValue: string;
  disabled: boolean;
  onChangeValue: (val: any) => void;
  type: string;
  showMax: boolean;
  jettonData: IServerJetton | null;
  swapTokenInfo: SwapDataInfo | undefined;
  currentChainInfo: AllChainData | null;
}

export default function SwapPanelInputBox({
  inputValue,
  disabled,
  onChangeValue,
  type,
  showMax,
  jettonData,
  swapTokenInfo,
  currentChainInfo,
}: SwapPanelInputBoxProps) {
  //   const swapStore: SwapDataStoreInterface = useAppSelector((state: RootState) => state.swapSlice);
  const [visible, setVisible] = useState<boolean>(false);

  const inputChange = async (e) => {
    if (type === 'input') {
      const val: string = filterNumberPipe(e.target.value, 12, true);
      onChangeValue && onChangeValue(val);
    }
  };
  const openModalClick = () => {
    setVisible(true);
  };

  return (
    <SwapPanelInputBoxRoot>
      <SwapPanelRow>
        <SwapPanelFlexCenter onClick={openModalClick}>
          <SwapPanelLabel>{type === 'input' ? 'From' : 'To'}</SwapPanelLabel>
          <SwapPanelFlexCenter>
            <img className={'logo'} src={getChainLogo(currentChainInfo?.chainId)} alt="" />
            <SwapPanelChain>{currentChainInfo?.chainName}</SwapPanelChain>
          </SwapPanelFlexCenter>
        </SwapPanelFlexCenter>
        <SwapPanelFlexCenter>
          <BalanceBox>Balance:{ToFixedPipe(jettonData?.balance, 6, 1)}</BalanceBox>
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
      </SwapPanelRow>
      <SwapPanelRow>
        <SwapPanelFlexCenterBg onClick={openModalClick}>
          <img className={'logoBig'} src={jettonData?.tokenLogoUrl} alt="" />
          <SwapPanelToken>{jettonData?.tokenSymbol}</SwapPanelToken>
        </SwapPanelFlexCenterBg>
        <DivSwapPanelInputBox
          placeholder="0"
          value={inputValue}
          onChange={inputChange}
          //   disabled={disabled}
        />
      </SwapPanelRow>
      <RateBox>
        ≈$
        {inputValue
          ? ToFixedPipe(
              Number(inputValue) *
                (type === 'input'
                  ? (swapTokenInfo?.baseUsdtPrice as number)
                  : (swapTokenInfo?.tokenUsdtPrice as number)),
              4,
              1,
            )
          : ''}
      </RateBox>
    </SwapPanelInputBoxRoot>
  );
}
