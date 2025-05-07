export interface HistoryData {
  order_id: string;
  user_id: string;
  tx_hash: string;
  bonus: number;
  provider: string;
  order_state: string;
  created_time: number;
  tx_route: string;
  real_gas_fee: string;
  refund_gas_fee: string;
  total_tx_fee: string;
  input_symbol: string;
  input_amount: string;
  output_symbol: string;
  output_amount: string;
  failure_reason: string;
  total_tx_fee_usdt: string;
  chain_id: number;
  rate: string;
  input_token_address?: string;
  output_token_address?: string;
}
