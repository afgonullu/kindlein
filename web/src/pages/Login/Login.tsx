/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext } from "react"
import { useHistory } from "react-router"
import { Button, Container, Form, Row } from "react-bootstrap"

import { useLoginUser } from "../../graphql/hooks/users"
import { useForm } from "../../graphql/hooks/useForm"
import { AuthContext } from "../../context/auth"
import { Link } from "react-router-dom"

const Login: React.FC = () => {
  const context = useContext(AuthContext)
  const history = useHistory()
  const [errors, setErrors] = useState({ username: "", password: "" })
  //TODO: Client Side Validation

  console.log(errors)

  const loginUser = useLoginUser(setErrors, history, context)

  const { onChange, onSubmit, values } = useForm(loginUser, {
    username: "",
    password: "",
  })

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Row>
        <Form noValidate onSubmit={onSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a Username"
              name="username"
              value={values.username}
              onChange={onChange}
              // isInvalid={errors.username !== "" && !!errors.username}
            />
            {/* <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={onChange}
              // isInvalid={errors.password !== "" && !!errors.password}
            />
            {/* <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Row>
      <Row style={{ display: "flex", flexDirection: "column" }}>
        <p>You do not have and account?</p>
        <Button variant="secondary" type="submit" as={Link} to="/register">
          Register
        </Button>
      </Row>
    </Container>
  )
}

export default Login
