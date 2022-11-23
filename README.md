```
oooooooooooo oooooo     oooo ooo        ooooo  .ooooo.     oooooooo 
`888'     `8  `888.     .8'  `88.       .888' 888' `Y88.  dP""""""" 
 888           `888.   .8'    888b     d'888  888    888 d88888b.   
 888oooo8       `888. .8'     8 Y88. .P  888   `Vbood888     `Y88b  
 888    "        `888.8'      8  `888'   888        888'       ]88  
 888       o      `888'       8    Y     888      .88P'  o.   .88P  
o888ooooood8       `8'       o8o        o888o   .oP'     `8bd88P'   
                                                                                                                     
```                                         

[![Netlify Status](https://api.netlify.com/api/v1/badges/7d210f06-8957-4d00-ab9b-28f40c250201/deploy-status)](https://app.netlify.com/sites/evm95/deploys)
[![npm version](https://badgen.net/npm/v/evm95)](https://www.npmjs.com/package/evm95)
![MIT licensed](https://badgen.net/badge/license/MIT/blue)


_**Instant retro UI for interacting with Smart Contracts on any EVM compatible blockchain**_

**[evm95.netlify.app](https://evm95.netlify.app)**

## Features

- 🤙 Call any contract function as long as you have the ABI
- 🔌 Connect via localhost:8545, MetaMask, or a custom node URL
- ⚡ Watches your artifacts folder and automatically updates the UI
- 🔢 Encode your calls for a proxy to call on your behalf
- ⚙️ Set a custom signer or a custom contract address
- 📜 Built-in log for easy visibility


## Usage 

Simply visit **[evm95.netlify.app](https://evm95.netlify.app)**

Connect via Metamask, wallet connect, or local RPC


## Local Deployment:

### Install

Works on any dapp / smart contract (Truffle, Buidler, etc.) as long as you point it to the JSON artifacts. OR Manually add ABIs and or artifacts for any already deployed smart contract you want to interact with.

1. Installation

    ```shell
    npm install -g evm95
    ```

2. Run with path to your artifacts folder:

    ```shell
    evm95 ./build/contracts
    ```

### How it works

When `evm95` is run, an Express server is fired up and a frontend (packaged by [Parcel](https://parceljs.org/)) is served at `localhost:3000` (you can define the port with a flag `-p 1234`). The server will watch the directory you passed in for any changes to your artifacts and send those changes down to the frontend via Websockets.

Note that you can also add any contract manually if you have the ABI or Artifact (there is an Add Contract button).

### Contact

If you have any questions or comments, please file an issue. I can also be reached via Telegram @GweiDart
