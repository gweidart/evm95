import React, { useState } from "react";
import styled from "styled-components";
import { Button, TabBody as rTabBody, Fieldset } from "react95";

import Select from "../common/Select";
import Input from "../common/Input";

import Contracts from "../../containers/Contracts";
import Etherscan, {
  getChainId,
  networkOptions,
} from "../../containers/Etherscan";

const TabBody = styled(rTabBody)`
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ByEtherscan = ({ closeModal }) => {
  const { addContract } = Contracts.useContainer();
  const {
    abi,
    name,
    setName,
    address,
    setAddress,
    network,
    setNetwork,
    retrievingABI,
    successRetrieveABI,
  } = Etherscan.useContainer();

  return (
    <>
      <TabBody>
        <div style={{ height: "452px" }}>
          <p>
            Select a network and import the contract address below. 
            The ABI will be retrieved automagically.
          </p>

          <br />

          <Fieldset
            label="Network:"
            style={{ marginBottom: "12px", minWidth: "auto" }}
          >
            <Select
              native
              value={network}
              options={networkOptions}
              onChange={(e) => setNetwork(e.target.value)}
              width="100%"
              className="connect-options"
            />
          </Fieldset>

          <br />

          <Fieldset
            label="Address:"
            style={{ marginBottom: "12px", minWidth: "auto" }}
          >
            <p>Note:The contract source code must be verified.</p>
            <br />
            <Input
              placeholder="*Import contract address*"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Fieldset>

          <br />

          <Fieldset label="Name (required):">
            <p>
              This is arbitrary and can be changed later. If left blank, the 
              contract name will be automatically generated.
            </p>
            <br />
            <Input
              placeholder="Rug.sol"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Fieldset>
        </div>
        <ButtonContainer>
          <Button
            fullWidth
            size="lg"
            style={{ marginTop: "1rem" }}
            onClick={closeModal}
          >
            Close
          </Button>
          <Button
            fullWidth
            size="lg"
            style={{ marginTop: "1rem" }}
            onClick={() =>
              addContract({
                name,
                abi,
                artifact: {
                  networks: {
                    [getChainId(network)]: { address },
                  },
                },
              })
            }
            disabled={retrievingABI || !successRetrieveABI || name.length === 0}
          >
            {retrievingABI
              ? "Fetching ABI..."
              : successRetrieveABI
              ? "Add Contract via explorer API"
              : "Unable to retrieve ABI from explorer!"}
          </Button>
        </ButtonContainer>
      </TabBody>
    </>
  );
};
export default ByEtherscan;
