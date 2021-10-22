import React, {useState} from 'react';
import {Button, TextField} from '@mui/material';


function GraphInput({graphName, addNewNumber}) {

  // state
  const [nameInput, setNameInput] = useState(graphName)
  const [numberInput, setNumberInput] = useState('')

  const isNumeric = val => !isNaN(val) // If it's not, not a number(nan), then it's a number

  const handleSubmit = event => {
    if(isNumeric(numberInput)) {
      if(nameInput && nameInput.length) {
        addNewNumber(nameInput, numberInput)
      }
    }
    event.preventDefault();
    setNumberInput('');
  }

  const handleEnterKey = event => {
    if(event.key === "Enter"){
      handleSubmit(event);
    }
  };

  return (
    <div className="GraphInput">
      <div className="GraphInput-name">
        <h3>{nameInput}</h3>
      </div>
      <form onKeyPress={handleEnterKey}>
        <TextField
          placeholder="Name your graph"
          value={nameInput}
          onChange={event => setNameInput(event.target.value)}
        /><br />
        <TextField
          type="number"
          placeholder="Enter number to graph"
          value={numberInput}
          onChange={event => setNumberInput(event.target.value)}
        /><br />
        <Button variant="contained" onClick={handleSubmit}>Save
        </Button>
      </form>

    </div>
  );
}

export default GraphInput;
