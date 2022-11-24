import React, { useState } from "react";
import styled from "styled-components";
import { Button, TabBody as rTabBody, TextField, Fieldset } from "react95";
import validateRawArtifact from "../../../common/validateRawArtifact";
import Contracts from "../../containers/Contracts";

const TabBody = styled(rTabBody)`
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ByAbi = ({ closeModal }) => {
  const { addByArtifact } = Contracts.useContainer();
  const [rawArtifact, setRawArtifact] = useState("");
  const [name, setName] = useState("");
  const isArtifactValid = validateRawArtifact(rawArtifact);

  const handleTextAreaChange = (e) => {
    const rawArtifact = e.target.value;
    setRawArtifact(e.target.value);
    if (validateRawArtifact(rawArtifact)) {
      setName(JSON.parse(rawArtifact).contractName);
    }
  };

  const addContract = () => {
    addByArtifact(JSON.parse(rawArtifact), name);
    closeModal();
  };
  return (
    <>
      <TabBody>
        <p>
          Artifacts.json can be obtained via a Solidity compiler.
          (ie. Hardhat, Truffle, Remix).
        </p>
        <br />
        <TextField
          placeholder="*Insert raw artifacts.json here*"
          onChange={handleTextAreaChange}
          multiline
          style={{ height: `240px`, fontFamily: "monospace" }}
        />
        <br />
        <Fieldset label="Name (required):">
          <p>
            This is arbitrary and can be changed anytime. If left blank, the 
            contract name will be automatically generated from the JSON artifact.
          </p>
          <br />
          <TextField
            placeholder="Rug.SOL"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Fieldset>
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
            onClick={addContract}
            disabled={!isArtifactValid || name.trim() === ""}
          >
            Add Contract via artifacts.json
          </Button>
        </ButtonContainer>
      </TabBody>
    </>
  );
};
export default ByAbi;
