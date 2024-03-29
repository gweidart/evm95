import React, { useState } from "react";
import { Select, Fieldset, Button, TextField } from "react95";
import Input from "../common/Input";
import Signers from "../../containers/Signers";

const CustomSigner = () => {
  const [text, setText] = useState("");
  const { attemptSetCustomSigner } = Signers.useContainer();

  return (
    <Fieldset label="Custom Signatory (Optional)" style={{ marginBottom: "12px" }}>
      <p>Private Key / Mnemonic:</p>
      <Input
        style={{ fontSize: `12px` }}
        value={text}
        placeholder="*Import private key OR mnemonic*"
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        fullWidth
        style={{ marginTop: "12px" }}
        onClick={() => {
          attemptSetCustomSigner(text);
        }}
        disabled={text === ""}
      >
        Connect
      </Button>
    </Fieldset>
  );
};

export default CustomSigner;
