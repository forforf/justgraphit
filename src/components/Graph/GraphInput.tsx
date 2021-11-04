import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { GraphEntryHandler, GraphName } from '../../JustGraphitTypes';

export type GraphInputProps = {
  graphName: GraphName;
  addNewNumber: GraphEntryHandler;
};

function GraphInput({ graphName, addNewNumber }: GraphInputProps): JSX.Element {
  // state
  const [nameInput, setNameInput] = useState(graphName);
  const [numberInput, setNumberInput] = useState('');

  const isNumeric = (val: string): boolean => !isNaN(+val); // If it's not, not a number(nan), then it's a number

  const handleSubmit = (event: React.FormEvent) => {
    if (isNumeric(numberInput)) {
      if (nameInput && nameInput.length) {
        addNewNumber(nameInput, numberInput);
      }
    }
    event.preventDefault();
    setNumberInput('');
  };

  const handleEnterKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit(event as React.FormEvent);
    }
  };

  return (
    <div className="GraphInput">
      <div className="GraphInput-name">
        <h3>{nameInput}</h3>
      </div>
      <form>
        <TextField
          placeholder="Name your graph"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          onKeyPress={handleEnterKey}
        />
        <br />
        <TextField
          type="number"
          placeholder="Enter number to graph"
          value={numberInput}
          onChange={(event) => setNumberInput(event.target.value)}
          onKeyPress={handleEnterKey}
        />
        <br />
        <Button
          variant="contained"
          onClick={handleSubmit}
          onKeyPress={handleEnterKey}
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default GraphInput;
