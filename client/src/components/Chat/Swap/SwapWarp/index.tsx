interface ISwapWarp {
  data: {
    action: string;
    data: [
      {
        'from_coin': '0x55d398326f99059ff775485246999027b3197955',
        'from_decimal': 18,
        'from_symbol': 'USDT',
        'to_coin': '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        'to_decimal': 18,
        'to_symbol': 'BNB',
        'from_amount': '1000.0',
        'to_amount': '0',
        'chain_name': 'BNB Chain',
        'chain_id': 56
      }
    ]
  }
}

export default function SwapWarp({ data }: ISwapWarp) {


  return (
    <div>
      SwapWarp
    </div>
  );
}
