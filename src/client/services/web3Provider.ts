import type { IProvider } from "@web3auth/base";
import Web3 from "web3";
import { IWalletProvider } from '../services/walletProvider';
import { GoalAbi, randomContractAbi } from "../config/abi";



const web3Provider = (provider: IProvider, uiConsole: (...args: unknown[]) => void): IWalletProvider => {
  const getAccounts = async () => {
    try {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      // uiConsole(account);
      return account;
    } catch (error) {
      console.error('Error', error);
      // uiConsole(error);
      throw error;
    }
  };

  const randomContractInteraction = async () => {
    try {
      const web3 = new Web3(provider as any);
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(randomContractAbi, '0x04cA407965D60C2B39d892a1DFB1d1d9C30d0334', { dataInputFill: 'data'});
      const txRes = await contract.methods.update(`Hello world ${Math.random().toString(36).substring(1, 5)}`).send({ from: accounts[0] });
      uiConsole('txRes', txRes);
    } catch (error) {
      console.log('error', error);
      uiConsole('error', error)
    }
  };

  const goalContract = async (target: string, stake: number, updates: number, deadline: number) => {
    try {
      const web3 = new Web3(provider as any);
      const accounts = await web3.eth.getAccounts();
      const contractAddress = '0xfb802eE16A7FAdEF91cf8e1AEcdf8063C11F3853';
      const target = 'Start a goal';
      const stake = 3;
      const updates = 3;
      const deadline = 1710018660;

      const contract = new web3.eth.Contract(GoalAbi, contractAddress);
      const txRes = await contract.methods.createGoal(target, stake, updates, deadline).send({ from: accounts[0], value: web3.utils.toWei(stake, 'ether')});
      uiConsole('txRes', txRes);
    } catch (error) {
      console.log('error', error);
      uiConsole('error', error)
    }
  }

  return {
    getAccounts,
    randomContractInteraction,
    goalContract,
  }
};

export default web3Provider;