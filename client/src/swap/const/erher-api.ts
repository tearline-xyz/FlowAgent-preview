import {
  Contract,
  ethers,
  // parseEther
  formatEther,
  toBeHex,
  ZeroAddress,
} from 'ethers';
// Contract
import StrategyManagerABI from '~/swap/abi/strategy-manager.json';
import Erc20ABI from '~/swap/abi/erc20_contract.json';
import BidABI from '~/swap/abi/bid.json';
import CakeABI from '~/swap/abi/cakeABI.json';
import VeCakeABI from '~/swap/abi/vecakeABI.json';
import PancakeFactory from '~/swap/abi/pancake-factory.json';
import PancakePair from '~/swap/abi/pancake-pair.json';

import { shiftedBy } from '~/swap/hooks/useOkxSwap';
import {ContractAddr, COIN_CONTRACT_ADDRESSES} from '~/swap/const/index';
import BigNumber from 'bignumber.js';

const ABI = {
  StrategyManager: StrategyManagerABI,
  ERC20: Erc20ABI,
  BidContract: BidABI,
  CakeABI: CakeABI,
  VeCakeABI: VeCakeABI,
  PancakeFactory: PancakeFactory,
  PancakePair: PancakePair,
};

export class EtherInitApi {
  public from;
  public providerInstance;
  public chainId;

  constructor(form, providerInstance, chainId?) {
    this.from = form;
    this.providerInstance = providerInstance;
    this.chainId = chainId;
  }

  async getGasPrice() {
    const provider: any = new ethers.BrowserProvider(this.providerInstance);
    return await provider.getGasPrice();
  }


  getContractAddr = async (contractName: string) => {
    return import.meta.env.VITE_APP_BASE_ENV === 'production'
      ? ContractAddr['56'][contractName]
      : ContractAddr['97'][contractName];
  };

  getContractByName(name, address) {
    let abi = null;
    if (ABI[name]) {
      abi = ABI[name];
    }
    return this.getContract(abi, address);
  }

  async getContract(abi, address) {
    if (!abi || !address) {
      return;
    }
    const provider: any = new ethers.BrowserProvider(this.providerInstance);
    const signer = await provider.getSigner();

    const contract: any = new Contract(
      address,
      abi,
      signer,
    );
    return contract;
  }


  allowance = async (
    tokenContractAddr: string,
    ownerAddress: string | any,
    spenderAddress: string,
  ) => {
    try {
      const provider: any = new ethers.BrowserProvider(this.providerInstance);
      const signer = await provider.getSigner();
      const contract: any = new Contract(tokenContractAddr, ABI.ERC20, signer);
      const decimals: any = await contract.decimals();
      const allowanceAmount = await contract.allowance(
        ownerAddress,
        spenderAddress,
      );
      return shiftedBy(allowanceAmount, decimals.toString(), -1);
    } catch (error) {
      console.error('Error fetching allowance:', error);
      throw error;
    }
  };


  signExecuteContract = async (contractAddressTo, value, data) => {
    const provider: any = new ethers.BrowserProvider(this.providerInstance);
    const nonce: any = await provider.getTransactionCount(this.from, 'latest');
    if (value && value != '0') {
      value = toBeHex(value);
    }
    const tx = {
      from: this.from,
      nonce: nonce, // hexlify(nonce.toString()), //
      // gasLimit: gasLimit.toString(),//hexlify(gasLimit.toString()), //
      // gasPrice: hexlify(gasPrice.toString().mul(1.5)), //
      to: contractAddressTo,
      value: value, //
      data: data,
    };
    return this.sendTransaction(tx);
  };

  async sendTransaction(params) {
    const provider = new ethers.BrowserProvider(this.providerInstance);
    const signer = await provider.getSigner();
    const tx = await signer.sendTransaction(params);
    return await tx.wait();
  }

  transactionReceiptAsync(hash, resolve, reject) {
    const provider: any = new ethers.BrowserProvider(this.providerInstance);
    provider
      .getTransactionReceipt(hash)
      .then(receipt => {
        if (!receipt) {
          setTimeout(() => {
            this.transactionReceiptAsync(hash, resolve, reject);
          }, 1000);
        } else {
          resolve(receipt);
        }
      })
      .catch(reject);
  }

  awaitTransactionMined(hash) {
    return new Promise((resolve, reject) => {
      this.transactionReceiptAsync(hash, resolve, reject);
    });
  }

  sendSignedTransaction = async (data: {
    to: string;
    value: any;
    data: string;
    gasLimit: any;
    gasPrice?: any;
    gas?: any;
  }) => {
    return this.signExecuteContract(data.to, data.value, data.data).then(
      (hash: any) => {
        return this.awaitTransactionMined(hash.hash);
      },
    );
  };

  getChainId = async () => {
    const provider: any = new ethers.BrowserProvider(this.providerInstance);
    console.log('provider', provider, provider.isOKXWallet);
    const network = await provider.getNetwork();
    console.log('network', network.chainId.toString());
  };

  getBalance = async (address: string) => {
    const provider: any = new ethers.BrowserProvider(this.providerInstance);
    return formatEther(await provider.getBalance(address));
  };

  deposit = async (orderId: string, amount: string, cbSuccess: Function, cbError: Function) => {
    try {
      const provider: any = new ethers.BrowserProvider(this.providerInstance);
      const signer = await provider.getSigner();
      const tokenContractAddr =
        import.meta.env.VITE_APP_BASE_ENV === 'production'
          ? ContractAddr['56'].recharge
          : ContractAddr['97'].recharge;
      const contract: any = new Contract(
        tokenContractAddr,
        ABI.BidContract,
        signer,
      );
      const amountInEther = amount.toString(); // Convert to string
      const amountInWei = ethers.parseEther(amountInEther);
      const tx = await contract.recharge(orderId, {
        value: amountInWei,
      });
      if (tx) {
        cbSuccess('success');
      }
      return await tx.wait();
    } catch (e) {
      cbError(e);
      console.log('e--', e);
    }
  };


  checkin = async (userId: string, amount: string | number, cbSuccess: Function, cbError: Function) => {
    console.log('userId:', userId);
    try {
      const provider: any = new ethers.BrowserProvider(this.providerInstance);
      const signer = await provider.getSigner();
      const tokenContractAddr =
        import.meta.env.VITE_APP_BASE_ENV === 'production'
          ? ContractAddr['56'].recharge
          : ContractAddr['97'].recharge;
      const contract: any = new Contract(
        tokenContractAddr,
        ABI.BidContract,
        signer,
      );
      const amountInEther = amount.toString(); // Convert to string
      const amountInWei = ethers.parseEther(amountInEther);
      const tx = await contract.checkIn(userId, {
        value: amountInWei,
      });
      cbSuccess(tx);
      return await tx.wait();
    } catch (e) {
      cbError(e);
      console.log('e', e);
    }
  };

  tokenBalance = async (address: string, account: string | any) => {
    try {
      const contract: any = await this.getContractByName('ERC20', address);
      const balance = await contract.balanceOf(account);
      return ethers.formatEther(balance);
    } catch (e) {

    }
  };

  approve = async (
    poolAddress: string,
    tokenContractAddr: string,
    maxApproval: any,
  ) => {
    const contract: any = await this.getContractByName('CakeABI', tokenContractAddr);
    const maxApprovalVal = ethers.parseEther(maxApproval + '');
    const tx = await contract.approve(poolAddress, maxApprovalVal);
    return await tx.wait();
  };


  createLock = async (amount: string, duration: number) => {
    try {
      const veCakePoolAddr: string = await this.getContractAddr('vecake');
      const contract: any = await this.getContractByName('VeCakeABI', veCakePoolAddr);
      // console.log('now', Math.floor(Date.now() / 1000));
      // const unlock_time = Math.floor(Date.now() / 1000) + (duration * 24 * 60 * 60);
      const amountInWei = ethers.parseEther(amount + '');

      console.log(amountInWei, duration);
      const tx = await contract.createLock(amountInWei, duration);
      return await tx.wait();
    } catch (e) {
      console.log('createLock', e);
    }
  };


  veCakeBalanceOf = async (account: string) => {
    try {
      const veCakePoolAddr: string = await this.getContractAddr('vecake');
      const contract: any = await this.getContractByName('VeCakeABI', veCakePoolAddr);
      const balance = await contract.balanceOf(account);
      return ethers.formatEther(balance);
    } catch (e) {
      console.log('veCakeBalanceOf', e);
    }
  };

  locks = async (account: string) => {
    try {
      const veCakePoolAddr: string = await this.getContractAddr('vecake');
      const contract: any = await this.getContractByName('VeCakeABI', veCakePoolAddr);
      return await contract.locks(account);
      // return ethers.formatEther(balance);
    } catch (e) {
      console.log('veCakeBalanceOf', e);
    }
  };

  veCakeGetUserInfo = async (account: string) => {
    try {
      const veCakePoolAddr: string = await this.getContractAddr('vecake');
      const contract: any = await this.getContractByName('VeCakeABI', veCakePoolAddr);
      return await contract.getUserInfo(account);

    } catch (e) {
      console.log('veCakeGetUserInfo', e);
    }
  };
  week = async () => {
    try {
      const veCakePoolAddr: string = await this.getContractAddr('vecake');
      const contract: any = await this.getContractByName('VeCakeABI', veCakePoolAddr);
      const week = await contract.WEEK();
      return week.toString();
    } catch (e) {
      console.log('week', e);
    }
  };


  increaseLockAmount = async (amount: string) => {
    try {
      const poolAddr: string = await this.getContractAddr('vecake');
      const contract: any = await this.getContractByName('VeCakeABI', poolAddr);
      const amountInWei = ethers.parseEther(amount);
      const tx = await contract.increaseLockAmount(amountInWei);
      return await tx.wait();
    } catch (e) {
      console.log('createLock', e);
    }
  };
  increaseUnlockTime = async (duration: string) => {
    try {
      const poolAddr: string = await this.getContractAddr('vecake');
      const contract: any = await this.getContractByName('VeCakeABI', poolAddr);
      const unlock_time = Math.floor(Date.now() / 1000) + (Number(duration) * 7 * 24 * 60 * 60);
      const tx = await contract.increaseUnlockTime(unlock_time);
      return await tx.wait();
    } catch (e) {
      console.log('createLock', e);
    }
  };

  erc20TokenInfo = async (tokenContractAddr: string) => {
    const contract: any = await this.getContractByName('ERC20', tokenContractAddr);
    const decimals: any = await contract.decimals();
    return {
      decimals: decimals.toString(),
    };
  };
  getPoolInfo = async (token0Addr: string, token1Addr: string) => {
    const contract: any = await this.getContractByName('PancakeFactory', COIN_CONTRACT_ADDRESSES.factory);
    const pairAddress = await contract.getPair(token0Addr, token1Addr);
    if (pairAddress === ZeroAddress) {
      throw new Error(token0Addr + '-' + token1Addr + ' Liquidity pool does not exist');
    }
    const contractPair: any = await this.getContractByName('PancakePair', pairAddress);
    const reserves: any = await contractPair.getReserves();
    const token0Contract = await contractPair.token0();
    const isCakeToken0 = token0Contract.toLocaleLowerCase() === token0Addr.toLocaleLowerCase();
    const token0Amount = isCakeToken0 ? reserves[0] : reserves[1];
    const token1Amount = isCakeToken0 ? reserves[1] : reserves[0];
    const { decimals: token0Decimals } = await this.erc20TokenInfo(token0Addr);
    const { decimals: token1Decimals } = await this.erc20TokenInfo(token1Addr);
    return {
      pairAddress,
      token0Amount: new BigNumber(token0Amount.toString()).shiftedBy(-1 * token0Decimals).toString(),
      token1Amount: new BigNumber(token1Amount.toString()).shiftedBy(-1 * token1Decimals).toString(),
      token0Decimals: token0Decimals.toString(),
      token1Decimals: token1Decimals.toString(),
    };

  };
  getBscTokenPrice = async (token0Addr: string, token1Addr: string) => {
    const {
      token0Amount,
      token1Amount,
    } = await this.getPoolInfo(token0Addr, token1Addr);
    return new BigNumber(token1Amount).dividedBy(token0Amount).toString();
  };
}
