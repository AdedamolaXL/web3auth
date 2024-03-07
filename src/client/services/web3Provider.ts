import type { IProvider } from "@web3auth/base";
import Web3 from "web3";
import { IWalletProvider } from '../services/walletProvider';

const web3Provider = (provider: IProvider, uiConsole: (...args: unknown[]) => void): IWalletProvider => {
  const getAccounts = async () => {
    try {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      uiConsole(account);
      return account;
    } catch (error) {
      console.error('Error', error);
      uiConsole(error);
      throw error;
    }
  };

  return {
    getAccounts,
  }
};

export default web3Provider;