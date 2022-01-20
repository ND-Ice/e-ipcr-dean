import React from "react";
import { useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";

export default function AddList({ title, onAdd }) {
  const [text, setText] = useState("");

  return (
    <InputGroup className="mb-2">
      <FormControl
        placeholder={title}
        aria-label={title}
        aria-describedby="basic-addon2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        variant="outline-primary"
        id="button-addon2"
        onClick={() => {
          if (text.length === 0) return;
          onAdd(text);
          return setText("");
        }}
      >
        Add
      </Button>
    </InputGroup>
  );
}
