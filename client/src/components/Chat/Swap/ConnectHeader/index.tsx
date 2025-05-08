import useCustomWeb3Modal, { ConnectEvm } from '~/components/Account/hooks/useCustomWeb3Modal';
import {
  SwapHeaderRight,
  SwapHeaderRightWalletBox,
  SwapHeaderRowAccount,
  SwapHeaderAccountBox
} from '~/components/Chat/Swap/ConnectHeader/useConectHeaderStyle';
import classNames from 'classnames';
import {getChainLogo} from '~/swap/const/contract';
import {truncateWalletAddr} from '~/swap/util/wallet-address';
import {getImageUrl} from '~/swap/util/image-url';
import {Button} from '~/components';

export default function ConnectHeader(){
  const { openModal, isConnected, address, disconnect,chainId}=useCustomWeb3Modal()
  return (
    <SwapHeaderRight id={'SwapHeaderRight'}>
      <SwapHeaderRightWalletBox className={classNames(
        isConnected ? 'ConnectSuccess' : 'NotConnect',
      )}>
        {isConnected ? (
          <SwapHeaderRowAccount>
            <SwapHeaderAccountBox>
              <img className={'AccountPng'} src={getChainLogo(chainId)} alt='' />
              {isConnected ? truncateWalletAddr(address) : ''}
              <img className={'SelectChatPng'} src={getImageUrl('swap/select-swap.png')} alt='' />
            </SwapHeaderAccountBox>
          </SwapHeaderRowAccount>
        ) : (
          <Button
            sx={(theme) => ({
              width: '12.4rem !important',
              [theme.breakpoints.down('sm')]: {
                width: '10.5rem !important',
              },

            })}
            className={classNames('swapButton', 'swapHeader')}
          >
            Connect Wallet
          </Button>
        )}
        {/*<ConnectWalletList className={'Header'} />*/}
        {/*<ConnectUserInfo*/}
        {/*  balance={balance}*/}
        {/*  symbol={symbol}*/}
        {/*  userAdder={userAdder}*/}
        {/*  setHistoryModal={setHistoryModal}*/}
        {/*  list={list}*/}
        {/*  tonChain={tonChain}*/}
        {/*/>*/}
      </SwapHeaderRightWalletBox>
    </SwapHeaderRight>
  )
}
