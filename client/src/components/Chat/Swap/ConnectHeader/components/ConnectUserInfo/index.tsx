import {
  ConnectUserInfoRoot,
  UserBox,
  UserAddressBox,
  UserAddressBalance,
  DisConnectBox,
  DisConnectBoxItem,
  // RowTitle,
  // HistoryBox,
  // TradeDetailBox,
  // TradeDetailBoxTop,
  // TradeDetailBoxBottom,
  // RowLoginTitle,
} from '~/components/Chat/Swap/ConnectHeader/components/ConnectUserInfo/useConnectUserInfoStyle';
import classNames from 'classnames';
import {truncateWalletAddr} from '~/swap/util/wallet-address';
import useCustomWeb3Modal from '~/components/Account/hooks/useCustomWeb3Modal';
import React from 'react';
import {getImageUrl} from '~/swap/util/image-url';

export function copyToClip(text: string, isTips?: boolean) {
  return new Promise((resolve, reject) => {
    try {
      const input: HTMLTextAreaElement = document.createElement('textarea');
      input.setAttribute('readonly', 'readonly');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      if (document.execCommand('copy')) document.execCommand('copy');
      document.body.removeChild(input);
      resolve(text);
      if (!isTips) {
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 100]);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
}



interface ConnectUserInfoProps {
  userAdder: string | any;
  balance: number;
  symbol: string;
}

export default function ConnectUserInfo({
  userAdder,
  balance,
  symbol,
}: ConnectUserInfoProps) {
  const {
    disconnectConnect,
    openModal
  } = useCustomWeb3Modal();
  const disconnectClick = () => {
    disconnectConnect();
  };
  return (
    <ConnectUserInfoRoot className={classNames('ConnectSuccessAb')}>
      <UserBox>
        <img src={getImageUrl('swap/user-ar.png')} alt="" />
      </UserBox>
      <UserAddressBox onClick={()=>{
        openModal()
      }}>
        {userAdder ? truncateWalletAddr(userAdder) : ''}
      </UserAddressBox>
      <UserAddressBalance>
        {balance}
        {symbol}
      </UserAddressBalance>

      <DisConnectBox>
        <DisConnectBoxItem
          onClick={() => {
            copyToClip(userAdder).then();
          }}
        >
          <img className={'CopyAddressPng'} src={getImageUrl('swap/copy-address.png')} alt="" />
          Copy Address
        </DisConnectBoxItem>
        <DisConnectBoxItem onClick={disconnectClick}>
          <img className={'DisconnectPng'} src={getImageUrl('swap/disconnect.png')} alt="" />
          Disconnect
        </DisConnectBoxItem>
      </DisConnectBox>
      {/*<RowTitle>Recent Transactions</RowTitle>*/}
      {/*<RowLoginTitle>Log in to view historical transactions</RowLoginTitle>*/}
    </ConnectUserInfoRoot>
  );
}
