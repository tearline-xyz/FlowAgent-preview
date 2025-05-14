import { ConnectModal } from '@suiet/wallet-kit';
import React, { useState } from 'react';

interface ISuiWalletModal {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean
}

export default function SuiWalletModal({ setShowModal, showModal }: ISuiWalletModal) {
  // const [showModal, setShowModal] = useState(false);
  return (
    <ConnectModal
      open={showModal}
      onOpenChange={(open) => setShowModal(open)}
    />
  );
}
