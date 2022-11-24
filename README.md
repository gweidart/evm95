[![Netlify Status](https://api.netlify.com/api/v1/badges/fa54aedc-5ec2-40f9-8320-daabe574330e/deploy-status)](https://app.netlify.com/sites/evm95/deploys)
[![Build bump tag](https://github.com/gweidart/evm95/actions/workflows/build-bump-and-tag.yml/badge.svg)](https://github.com/gweidart/evm95/actions/workflows/build-bump-and-tag.yml)
[![Release](https://github.com/gweidart/evm95/actions/workflows/release-package.yml/badge.svg)](https://github.com/gweidart/evm95/actions/workflows/release-package.yml)
[![HitCount](https://hits.dwyl.com/gweidart/evm95.svg?style=flat-square&show=unique)](http://hits.dwyl.com/gweidart/evm95)
![MIT licensed](https://badgen.net/badge/license/MIT/blue)

### _**Instant retro Smart Contract interface**_

## Web App

**[evm95.netlify.app](https://evm95.netlify.app)**

## Features

- 🤙 Call any contract function (Pure and View)
- 🔌 Connect via MetaMask, localhost:8545, or your own custom node URL
- ⚡ Watches your artifacts folder and automatically updates the UI
- 🔢 Encode your function calls and execute via a proxy
- ⚙️ Set a custom signer or a custom contract address
- ⛽ Set custom gas limits
- 📜 Built-in log for easy visibility

## Usage

Compatible with any dapp / smart contract. Simply copy & paste the ABI or artifacts.json for any deployed smart contract you would like to interact with.

1. Connect your wallet:

    ```
    Currently supported:
    - MetaMask
    - Custom RPC
    - Localhost
    ```

2. Add contract:

    ```
    - Paste the contract address in the "Contract" field
    - Click "Add Contract", you will then be prompted for the contracts ABI or Artifacts.json
    - You can copy any contracts ABI via most block explorers (is. etherscan.io, ftmscan.com, bscscan.com, etc.)
    - Alternatively, if this is a contract you deployed. You can copy & paste the artifacts.json
    - You will then be prompted to name the contract. This name is arbitrary. 
    - Finally, click "Add contract via ABI / Artifacts.json"
    ```
3. Functions:

    ```
    - Choose the contract from the contracts list (left sidebar)
    - The "Functions" list will then populate.
    - Choose from the list of smart contract function calls.
    - If the function is "view" you will "submit" (Free) otherwise "Pure" you will "Sign" and submit a txn (payable).
    - Returned values are logged in real time for easy visibility.
    ```
 #### _Custom gas limit, custom signer, and encoding are also supported!_
    
    
![alt text][webApp]

[webApp]: https://gateway.pinata.cloud/ipfs/QmXYpnVcSTZ6E1EAwRVNiAoRyMVUbTw8CRfgsGWMqKHmfe "evm95.netlify.app"


## CLI / Local Deployment:

### Install

Compatible with any dapp / smart contract (Truffle, Buidler, etc.) as long as you provide the JSON artifacts. OR Manually add ABIs and or artifacts.json for pre deployed smart contracts.

1. Install from the command line:

    ```shell
    npm install @gweidart/evm95@1.0.0
    ```
    
    OR
    
   Install via package.json:
 
    ```shell
    "@gweidart/evm95": "1.0.0"
    ```
    
2. Run with path to your artifacts folder:

    ```shell
    @gweidart/evm95 ./build/contracts
    ```
    
3. Navigate to your Local Deployment via http://localhost:3000


4. Refer to steps 1 - 3 detailed at the beginning of this document in the **[Web App](https://github.com/gweidart/evm95/edit/main/README.md#usage)** section.



![alt text][cli]

[cli]: https://gateway.pinata.cloud/ipfs/QmcjUbwmgHtppTNSAHvsdeSsqSUhshQHeJ6qyup8kyYduU "evm95 cli"


### How it works

When `@gweidart/evm95` is run, an Express server is fired up and a frontend (packaged by [Parcel](https://parceljs.org/)) is served at `localhost:3000` (you can define the port with the -p flag `-p 1234`). The server will watch the directory you passed in for any changes to your artifacts and send those changes to the frontend via Websockets.

_Note: you can also add contracts manually if you have the ABI or Artifact (there is an Add Contract button)_.

### Contact

If you have any questions or comments, please file an issue. I can also be reached via **Telegram** **[@GweiDart](https://t.me/gweidart)** or **Twitter** **[@0ndex](https://twitter.com/0ndex)**
