import React, { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";

function SubHeader({ onSearch, searchText, ...props }) {
  const inputRef = useRef();
  const [text, setText] = useState(searchText || "");

  useEffect(() => {
    setText(searchText);
  }, [searchText]);

  return (
    <div>
      <InputGroup className="mb-3" {...props}>
        <Form.Control
          placeholder="search..."
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          variant="outline-primary"
          onClick={() => {
            const value = inputRef.current.value;
            onSearch(value);
          }}
        >
          <div className="d-flex justify-content-start align-items-center">
            <IoSearch className="me-2" />
            Search
          </div>
        </Button>
      </InputGroup>
    </div>
  );
}

export default SubHeader;
