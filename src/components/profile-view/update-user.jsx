import React from "react";
import { Form, Button } from "react-bootstrap";

export const UpdateUser = ({ handleUpdate, handleInputChange, formValues }) => {
  return (
    <>
      <div>
        <h1>Update User data</h1>
        <Form onSubmit={handleUpdate}>
          <Form.Group>
            <Form.Label>
              Username:
              <Form.Control className="custom-input-text-color"
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
                minLength="2"
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Password:
              <Form.Control className="custom-input-text-color"
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
                minLength="8"
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Email:
              <Form.Control className="custom-input-text-color"
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Date of Birth:
              <Form.Control className="custom-input-text-color"
                type="date"
                name="birthday"
                value={formValues.birthday}
                onChange={handleInputChange}
              />
            </Form.Label>
          </Form.Group>
          <Button type="submit">
            Update
          </Button>
        </Form>
      </div>
    </>
  );
}