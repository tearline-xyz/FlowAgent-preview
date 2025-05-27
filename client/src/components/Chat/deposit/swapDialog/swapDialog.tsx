import React from 'react';
import Dialog from '~/components/Mui/Dialog/Dialog';
import { IServerJetton } from '~/swap/interface';
import SwapWarp from '../../Swap/SwapWarp';

interface SwapDialogProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toTokenJetton: IServerJetton | null;
}

const SwapDialog: React.FC<SwapDialogProps> = ({ visible, setVisible, toTokenJetton }) => {
  const swapWrapProps = {
    action: '',
    data: [
      {
        chain_id: 784,
        chain_name: 'Sui',
        from_amount: '',
        from_coin: '0x2::sui::SUI',
        from_decimal: 9,
        from_symbol: 'SUI',
        to_amount: '0',
        to_coin: toTokenJetton?.tokenContractAddress ?? '',
        to_decimal: Number(toTokenJetton?.decimals) ?? 6,
        to_symbol: toTokenJetton?.tokenSymbol ?? '',
      },
    ],
  };
  return (
    <Dialog
      open={visible}
      onClose={() => {
        setVisible(false);
      }}
      hiddenTitle={true}
      className={'addTips'}
    >
      <SwapWarp data={swapWrapProps} />
    </Dialog>
  );
};

export default SwapDialog;
