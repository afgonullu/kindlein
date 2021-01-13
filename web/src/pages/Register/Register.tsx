/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react"
import { useHistory } from "react-router"
import { Button, Container, Form } from "react-bootstrap"

import { useRegisterUser } from "../../graphql/hooks/users"
import { useForm } from "../../graphql/hooks/useForm"

const Register: React.FC = () => {
  const history = useHistory()
  const [errors, setErrors] = useState({ username: "", email: "", password: "", confirmPassword: "" })
  //TODO: Client Side Validation

  const registerUser = useRegisterUser(setErrors, history)

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  return (
    <Container style={{ maxWidth: "330px", height: "100vh", display: "flex", alignItems: "center" }}>
      <Form noValidate onSubmit={onSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a Username"
            name="username"
            value={values.username}
            onChange={onChange}
            isInvalid={errors.username !== "" && !!errors.username}
          />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={onChange}
            isInvalid={errors.email !== "" && !!errors.email}
          />
          <Form.Text className="text-muted">We will never share your email with anyone else.</Form.Text>
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={onChange}
            isInvalid={errors.password !== "" && !!errors.password}
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter Password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={onChange}
            isInvalid={errors.confirmPassword !== "" && !!errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  )
}

export default Register
