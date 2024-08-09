import React from "react";
import { Button } from "react-bootstrap";

export const DeleteUser = ({ deleteUser }) => {
  return (
  <div>
    <h1>Delete User Account</h1>
    <Button variant="danger" onClick={deleteUser}>
      Delete
    </Button>
  </div>
  );
};