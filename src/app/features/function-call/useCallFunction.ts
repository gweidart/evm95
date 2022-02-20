import { ethers, providers, Wallet } from "ethers";
import abiDecoder from "abi-decoder";
import { SignatureLike } from '@ethersproject/bytes'
import { PopulatedTransaction } from '@ethersproject/contracts'
import { keccak256 } from '@ethersproject/keccak256'

import OutputLog from "../../containers/OutputLog";
import ContractAddress from "../../containers/ContractAddress";
import Contracts from "../../containers/Contracts";
import Signers from "../../containers/Signers";

import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
//var Web3 = require('web3');
//let library;
var welcomeMessage = 0;

const useCallFunction = (args, types, fn, opts) => {
  const { addLogItem, addJSONLogItem } = OutputLog.useContainer();
  const { selectedContract } = Contracts.useContainer();
  const { address } = ContractAddress.useContainer();
  const { signer } = Signers.useContainer();

  const logEvents = async (tx) => {
    const receipt = await signer.provider.getTransactionReceipt(tx.hash);
    abiDecoder.addABI(selectedContract.abi);
    const decoded = abiDecoder.decodeLogs(receipt.logs);
    decoded.forEach((evt) => {
      const values = evt.events.map((x) => {
        if (x.type === "bytes32") {
          return ethers.utils.parseBytes32String(x.value);
        }
        return x.value;
      });
      addLogItem(`Event: ${evt.name}(${values})`);
    });
  };

  const callFunction = async () => {
    // handle array and int types
    const processedArgs = args.map((arg, idx) => {
      const type = types[idx];
      if (type.slice(-2) === "[]") return JSON.parse(arg);
      if (type.substring(0, 4) === "uint") return ethers.BigNumber.from(arg);
      return arg;
    });

    const instance = new ethers.Contract(address, selectedContract.abi, signer);
    var userAddress = await signer.getAddress();


    if(welcomeMessage == 0){
      addLogItem(`Hello, welcome!`)
      welcomeMessage = 1;
    }

    //addLogItem(JSON.stringify(fn));

    if (fn.stateMutability !== "view" && fn.constant !== true) {


      if (Wallet.name == 'MetaMask') {
        var method = "personal_sign";
      } else {
        var method = "eth_sign";
      }

      try {
        const estimateGas = await instance.estimateGas[fn.name](...processedArgs, opts);
        opts.gasLimit = estimateGas
        addLogItem(`Gas Estimate: ` + estimateGas);
      } catch (error) {
        addLogItem(`Gas could not be estimated`);
      }

      try {
        const estimateGasPrice = await signer.provider.getGasPrice();
        opts.gasPrice = estimateGasPrice
        addLogItem(`Gas Price: ` + estimateGasPrice);
      } catch (error) {
        addLogItem(`Gas price could not be estimated`);
      }

      if (opts.gasPrice > 0 && opts.gasLimit > 0) {
        let gasCost = opts.gasLimit*opts.gasPrice;
        addLogItem(`MAX Gas Cost: ` + ethers.utils.formatEther(JSON.stringify(gasCost)));
      }

      try {
        const getNonce = await signer.getTransactionCount();
        const getNoncePosition = await getNonce;
        opts.nonce = parseInt(JSON.stringify(getNoncePosition))
        addLogItem(`Nonce: ` + getNoncePosition);
      } catch (error) {
        addLogItem(`Nonce could not be retrieved`);
      }

      if (!(signer instanceof JsonRpcSigner)) {
        throw new Error(`Cannot sign transactions with this wallet type`)
      }

      let populatedResponse;
      let hash;
      let serialized;

      const getSignature = await instance.populateTransaction[fn.name](...processedArgs, opts).then((response: PopulatedTransaction) => {

        delete response.from
        //response.from = userAddress;
        response.chainId = 1
        serialized = ethers.utils.serializeTransaction(response)
        hash = keccak256(serialized)
        populatedResponse = response
        return populatedResponse;
      })

      const addr = await signer.getAddress();
      // @ts-expect-error
      let isMetaMask = signer.provider.provider.isMetaMask;
      // @ts-expect-error
      signer.provider.provider.isMetaMask = false;
      
      const getSignature2 = await signer.provider.send(method, [addr.toLowerCase(), ethers.utils.hexlify(hash),])
        .then((signature: SignatureLike) => {
          const txWithSig = ethers.utils.serializeTransaction(populatedResponse, signature)
          return txWithSig
        // @ts-expect-error
        }).finally(() => { signer.provider.provider.isMetaMask = isMetaMask })

      addLogItem(`Signed Transaction:\n\n` + getSignature2)

    } else {
      // view fn
      const result = await instance[fn.name](...processedArgs);
      // simple return type
      if (!Array.isArray(result)) {
        addLogItem(result.toString());
        return;
      }

      // complex return type
      const processArray = (arr) => {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
          const val = Array.isArray(arr[i])
            ? processArray(arr[i])
            : arr[i].toString();
          newArr.push(val);
        }
        return newArr;
      };

      let processed = processArray([...result]);

      addJSONLogItem(JSON.stringify(processed, null, 2));
    }
  };

  return { callFunction };
};

export default useCallFunction;
