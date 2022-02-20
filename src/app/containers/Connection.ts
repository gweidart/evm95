import { createContainer } from "unstated-next";
import { useState, useEffect, useCallback } from "react";
import { ethers, providers } from "ethers";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import Onboard from 'bnc-onboard'
import Web3 from 'web3'
const RPC_URL = "https://rpc-mainnet.kcc.network"


const wallets = [
{
  walletName: 'ledger',
  rpcUrl: RPC_URL
},
{ walletName: "metamask"},
{
  walletName: 'walletConnect',
  infuraKey: '00a5b13ef0cf467698571093487743e6'
}

];


const onboard = Onboard({
  dappId: "ad454b00-3218-4403-95e9-22c3c7d3adc0",       // [String] The API key created by step one above
  networkId: 321,  // [Integer] The kcc network ID your Dapp uses.
  subscriptions: {
    wallet: wallet => {
        window.localStorage.setItem('selectedWallet', wallet.name)
        //web3 = new Web3(wallet.provider)
    }
  },
  walletSelect: {
    wallets: wallets
  }
  
});

export enum Method {
  Localhost = "Localhost",
  MetaMask = "MetaMask",
  Custom = "Custom",
}

export const options = [
  { value: Method.MetaMask, label: "🦊 Injected Web3" },
  { value: Method.Custom, label: "🔧 RPC / API" }
];

export function useConnection() {
  const { hostname } = window.location;
  const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
  const defaultOption = Method.MetaMask; //y u default to local b4 argh

  const [connection, setConnection] = useState(defaultOption);
  const [provider, setProvider] = useState<
    JsonRpcProvider | Web3Provider | null
  >(null);

  const testAndSetProvider = async (
    provider: JsonRpcProvider | Web3Provider,
  ) => {
    try {
      await provider.getNetwork();
      setProvider(provider);
    } catch (error) {
      console.error(error);
      setProvider(null);
    }
  };

  const connectLocalhost = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      testAndSetProvider(provider);
    } catch (error) {
      console.error(error);
    }
  };




  const connectMetaMask = async () => {
    try {
      await onboard.walletSelect();
      await onboard.walletCheck();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      testAndSetProvider(provider);



    } catch (error) {
      console.error(error);
      alert("Cannot connect to Wallet, are you sure it has been installed?");
    }
  };

  const connectCustom = async (nodeUrl: string) => {
    if (nodeUrl.trim() === "") return;
    try {
      const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
      testAndSetProvider(provider);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setProvider(null);
    if (connection === Method.Localhost) {
      connectLocalhost();
    }
  }, [connection]);

  // re-register MetaMask provider whenever network changes
  useEffect(() => {
    window.ethereum?.on("networkChanged", () => {
      connectMetaMask();
    });
  }, [provider]);

  return {
    connection,
    setConnection,
    provider,
    setProvider,
    connectMetaMask,
    connectCustom,
    connectLocalhost,
  };
}

export default createContainer(useConnection);
