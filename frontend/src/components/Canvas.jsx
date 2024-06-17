import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";

const Canvas = function ({ show, handleClose }) {
  return (
    <Offcanvas placement="end" show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists,
        etc.
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Canvas;
