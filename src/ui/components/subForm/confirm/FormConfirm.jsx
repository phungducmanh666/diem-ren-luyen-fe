import React from "react";
import { Button, Modal } from "react-bootstrap";

function FormConfirm({ onHide, onConfirm, title, content, selectedRow }) {
  return (
    <Modal centered show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="danger" onClick={onHide}>
          Đóng
        </Button>
        <Button
          size="sm"
          variant="primary"
          onClick={() => onConfirm(selectedRow)}
        >
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormConfirm;
