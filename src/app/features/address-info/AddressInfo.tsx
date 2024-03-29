import React, { useState } from "react";
import styled from "styled-components";
import { Panel, Fieldset, Divider } from "react95";

import Network from "../../containers/Network";
import ContractAddress from "../../containers/ContractAddress";
import Input from "../common/Input";

const containerWidth = 475;
const Container = styled(Fieldset)`
  display: flex;
  width: ${containerWidth}px;
  min-width: ${containerWidth}px;
  display: flex;
  flex-direction: column;
`;

const AddressPanel = styled(Panel)`
  padding: 0.1rem 0.25rem;
  width: 100%;
  font-size: 14px;
  font-family: monospace;
  white-space: nowrap;
  overflow: hidden;
  line-height: 20px;
  // margin-top: 1rem;
`;

const AddressInfo = () => {
  const [inputText, setInputText] = useState("");
  const { network } = Network.useContainer();
  const {
    addressFromArtifact,
    setCustomAddress,
    address,
  } = ContractAddress.useContainer();
  return (
    <Container label="Contract Address:">
      <div>Target Contract:</div>
      <Input
        placeholder="*Insert Smart Contract address here*"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          setCustomAddress(e.target.value);
        }}
      />

      <div>
        <div style={{ marginTop: `1rem` }}>
          Imported via artifacts: {network?.name}{" "}
          {network && `(${network?.chainId})`}:
        </div>
        <AddressPanel variant="well">
          {addressFromArtifact || "No address found in artifacts.json"}
        </AddressPanel>
        <Divider style={{ marginTop: `1rem` }} />
        <div style={{ marginTop: `1rem` }}>
          <strong>Selected Smart Contract:</strong>
        </div>
        <AddressPanel variant="well">
          {address || "Invalid address, function call will likely fail"}
        </AddressPanel>
      </div>
    </Container>
  );
};

export default AddressInfo;
