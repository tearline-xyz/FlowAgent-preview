import { LAMPORTS_PER_SOL } from '@solana/web3.js';
// import { ToFixedPipe } from '~/swap/const/bignumber';

export class SolApi {

  public from;
  public connection;
  public walletProviderSol;

  constructor(from, connection, walletProviderSol) {
    this.from = from;
    this.connection = connection;
    this.walletProviderSol = walletProviderSol;
  }

  getBalance = async () => {
    const balance = await (this.connection as any).getBalance(
      this.walletProviderSol?.publicKey as any,
    );
    return Promise.resolve((balance / LAMPORTS_PER_SOL)+'');
  };
}
