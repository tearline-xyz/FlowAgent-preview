import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

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
    return Promise.resolve((balance / LAMPORTS_PER_SOL) + '');
  };
  test = async () => {
    console.log('this.walletProviderSol?.publicKey', this.walletProviderSol?.publicKey);
    console.log('this.from', this.from);
  };


  getTokenAccount = async (tokenAddr:string) => {

    const walletAddress = new PublicKey(this.from);

    const tokenMintAddress = new PublicKey(tokenAddr);
    try {
      const associatedTokenAddress = await getAssociatedTokenAddress(
        tokenMintAddress, // token mint
        walletAddress, // owner
        false, // allowOwnerOffCurve
        TOKEN_PROGRAM_ID, // token program id
        ASSOCIATED_TOKEN_PROGRAM_ID, // associated token program id
      );

      console.log('Associated Token Address:', associatedTokenAddress.toBase58());
      return associatedTokenAddress;
    } catch (error) {
      console.error('Error getting associated token address:', error);
      return null;
    }
  };

  getTokenBalance = async (tokenAccount) => {
    if (!tokenAccount) {
      console.log('Token account not found');
      return '0';
    }
    try {
      const balance = await this.connection.getTokenAccountBalance(new PublicKey(tokenAccount));
      if (balance.value.uiAmount !== null) {
        // console.log(`PYTH Balance: ${balance.value.uiAmount}`);
        return balance.value.uiAmount+'';
      } else {
        console.log('No tokens found in this wallet.');
        return '0';
      }
    } catch (error) {
      console.error('Error getting token balance:', error);
      return '0';
    }
  };

}
