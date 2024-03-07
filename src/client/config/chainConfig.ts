import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";

export const CHAIN_CONFIG = {
  calibration: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x4cb2f",
      displayName: "Filecoin Calibration Testnet",
      tickerName: "tFIL",
      ticker: "tFIL",
      rpcTarget: 'https://api.calibration.node.glif.io/rpc/v1',
      blockExplorerUrl: 'https://calibration.filfox.info/',
      logo: 'https://cryptologos.cc/logos/filecoin-fil-logo.svg',
  } as CustomChainConfig,
  mumbai: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x13881", // hex of 80001, polygon testnet
      rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
      // Avoid using public rpcTarget in production.
      // Use services like Infura, Quicknode etc
      displayName: "Polygon Mumbai Testnet",
      blockExplorerUrl: "https://mumbai.polygonscan.com/",
      ticker: "MATIC",
      tickerName: "Matic",
      logo: "https://web3auth.io/images/web3authlog.png",
  } as CustomChainConfig,
  sepolia: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0xaa36a7",
      displayName: "Ethereum Sepolia",
      tickerName: "Ethereum",
      ticker: "ETH",
      rpcTarget: "https://rpc.ankr.com/eth_sepolia",
      blockExplorerUrl: "https://sepolia.etherscan.io",
      logo: "https://web3auth.io/images/web3authlog.png",
    } as CustomChainConfig,
} as const;

export type CHAIN_CONFIG_TYPE = keyof typeof CHAIN_CONFIG;