import { ethers } from "ethers";
import abiDecoder from "abi-decoder";

import OutputLog from "../../containers/OutputLog";
import ContractAddress from "../../containers/ContractAddress";
import Contracts from "../../containers/Contracts";
import Signers from "../../containers/Signers";

const useCallFunction3 = (args, types, fn, opts) => {
  const { addLogItem, addJSONLogItem } = OutputLog.useContainer();
  const { selectedContract } = Contracts.useContainer();
  const { address } = ContractAddress.useContainer();
  const { signer } = Signers.useContainer();


  const callFunction3 = async () => {
    // handle array and int types
    const processedArgs = args.map((arg, idx) => {
      const type = types[idx];
      if (type.slice(-2) === "[]") return JSON.parse(arg);
      if (type.substring(0, 4) === "uint") return ethers.BigNumber.from(arg);
      return arg;
    });

    //addLogItem(processedArgs)
    let iface = new ethers.utils.Interface(selectedContract.abi);
    let calldata = iface.encodeFunctionData(fn.name,processedArgs);
    addLogItem(`bytes: ${calldata}`);

  };

  return { callFunction3 };
};

export default useCallFunction3;
