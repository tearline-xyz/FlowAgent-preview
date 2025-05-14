import {
  NotConnectAbsolute,
  NotTitle,
  WalletBox,
  WalletChainBox,
  OtherChain,
  WalletTypeBox,
  WalletTypeBoxLeft,
  WalletTypeBoxRight,
  WalletTypeName,
  WalletTypeFullName,
  ConnectArrow,
  ConnectArrowSol,
} from '~/components/Chat/Swap/ConnectHeader/components/ConnectWalletList/useConnectWalletListStyle';
import classNames from 'classnames';
import useCustomWeb3Modal, {
  ConnectEvm,
  ConnectSol,
} from '~/components/Account/hooks/useCustomWeb3Modal';
import CheckNetwork from '~/components/Chat/Swap/CheckNetwork';
import { useState } from 'react';
import { getImageUrl } from '~/swap/util/image-url';
import SuiWalletModal from '~/components/Chat/Swap/ConnectHeader/components/SuiWalletModal';
import { ChainIdEnum } from '~/swap/enum';

interface ConnectWalletListProps {
  className: string;
  setVisibleMobal?: () => void;
}

export default function ConnectWalletList({ className, setVisibleMobal }: ConnectWalletListProps) {
  const [chainNumber, setChainNumber] = useState<number>(-1);

  const { openModal } = useCustomWeb3Modal();
  const [showModal, setShowModal] = useState(false);
  const connectClick = async (type: string, chain: number) => {
    setChainNumber(chain);
    if (type === 'EVM') {
      await openModal(ConnectEvm);
    }
    if (type === 'SOL') {
      await openModal(ConnectSol);
    }
    if (type === 'SUI') {
      setShowModal(true);
    }
    setVisibleMobal && setVisibleMobal();
  };
  return (
    <NotConnectAbsolute className={classNames('NotConnectAbsolute', className)}>
      <CheckNetwork chainNumber={chainNumber} setChainNumber={setChainNumber} />
      <NotTitle className={'NotTitle'}>Connect Wallet</NotTitle>
      <WalletBox onClick={() => connectClick('EVM', ChainIdEnum.BSC)}>
        <WalletChainBox className={'BscBox'}>
          <img
            className={'BscPng'}
            src={'https://www.okx.com/cdn/wallet/logo/BNB-20220308.png'}
            alt=''
          />
        </WalletChainBox>
        <WalletTypeBox>
          <WalletTypeBoxLeft>
            <WalletTypeName>BNB Chain</WalletTypeName>
            <WalletTypeFullName>BNB Smart Chain Mainnet</WalletTypeFullName>
          </WalletTypeBoxLeft>
          <WalletTypeBoxRight>
            <div className='text'>Connect</div>
            <ConnectArrow>
              <img src={getImageUrl('swap/Connect-Arrow.png')} alt='' />
            </ConnectArrow>
          </WalletTypeBoxRight>
        </WalletTypeBox>
      </WalletBox>
      <OtherChain>
        <div className='left' />
        Other Chain
        <div className='right' />
      </OtherChain>

      <WalletBox className={'SolBox'} onClick={() => connectClick('EVM', ChainIdEnum.Ethereum)} key={'evm'}>
        <WalletChainBox>
          <img className={'EvmPng'} src={getImageUrl('swap/evm-chain-logo.png')} alt='' />
        </WalletChainBox>
        <WalletTypeBox>
          <WalletTypeBoxLeft>
            <WalletTypeName className={'SolName'}>EVM</WalletTypeName>
            <WalletTypeFullName className={'SolFullName'}>
              Ethereum Virtual Machine
            </WalletTypeFullName>
          </WalletTypeBoxLeft>
          <WalletTypeBoxRight className={'SolConnect'}>
            <div className='text'>Connect</div>
            <ConnectArrowSol>
              <img src={getImageUrl('swap/bg-arrow.svg')} alt='' />
            </ConnectArrowSol>
          </WalletTypeBoxRight>
        </WalletTypeBox>
      </WalletBox>

      <WalletBox className={'SolBox'} onClick={() => connectClick('SOL', ChainIdEnum.Sol)} key={'sol'}>
        <WalletChainBox className={'SolChainBox'}>
          <img className={'SolPng'} src={getImageUrl('swap/sol-chain-logo.png')} alt='' />
        </WalletChainBox>
        <WalletTypeBox>
          <WalletTypeBoxLeft>
            <WalletTypeName className={'SolName'}>Solana</WalletTypeName>
            <WalletTypeFullName className={'SolFullName'}>Solana</WalletTypeFullName>
          </WalletTypeBoxLeft>
          <WalletTypeBoxRight className={'SolConnect'}>
            <div className='text'>Connect</div>
            <ConnectArrowSol>
              <img src={getImageUrl('swap/bg-arrow.svg')} alt='' />
            </ConnectArrowSol>
          </WalletTypeBoxRight>
        </WalletTypeBox>
      </WalletBox>


      <WalletBox className={'SolBox'} onClick={() => connectClick('SUI', ChainIdEnum.Sui)} key={'sui'}>
        <WalletChainBox className={'SolChainBox'}>
          <img className={'SolPng'} src={'https://web3.okx.com/cdn/wallet/logo/sui_17700.png'} alt='' />
        </WalletChainBox>
        <WalletTypeBox>
          <WalletTypeBoxLeft>
            <WalletTypeName className={'SolName'}>Sui</WalletTypeName>
            <WalletTypeFullName className={'SolFullName'}>Sui</WalletTypeFullName>
          </WalletTypeBoxLeft>
          <WalletTypeBoxRight className={'SolConnect'}>
            <div className='text'>Connect</div>
            <ConnectArrowSol>
              <img src={getImageUrl('swap/bg-arrow.svg')} alt='' />
            </ConnectArrowSol>
          </WalletTypeBoxRight>
        </WalletTypeBox>
      </WalletBox>

      <SuiWalletModal setShowModal={setShowModal} showModal={showModal} />
    </NotConnectAbsolute>
  );
}
