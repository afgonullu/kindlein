import React from "react"
import { Button, Container, Form } from "react-bootstrap"

import { useCreateMoment } from "../../graphql/hooks/moments"
import { useForm } from "../../graphql/hooks/useForm"

const MomentForm: React.FC = () => {
  // const [errors, setErrors] = useState({ title: "", body: "", momentDate: "", location: "" })

  const createMoment = useCreateMoment()

  const { onChange, onSubmit, values } = useForm(createMoment, {
    title: "",
    body: "",
    momentDate: "",
    location: "",
  })

  //TODO: Form styling, wording, labels and other stuff.
  //TODO: errors, error views
  return (
    <Container style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Form noValidate onSubmit={onSubmit}>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Moment Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="A Moment To Remember"
            name="title"
            value={values.title}
            onChange={onChange}
            // isInvalid={errors.title !== "" && !!errors.title}
          />
          {/* <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback> */}
        </Form.Group>
        <Form.Group controlId="formBasicBody">
          <Form.Label>Moment Body</Form.Label>
          <Form.Control
            type="text"
            placeholder="Never Miss a Detail"
            name="body"
            value={values.body}
            onChange={onChange}
            // isInvalid={errors.body !== "" && !!errors.body}
          />
          {/* <Form.Control.Feedback type="invalid">{errors.body}</Form.Control.Feedback> */}
        </Form.Group>
        <Form.Group controlId="formBasicDate">
          <Form.Label>Moment Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="When Did This Happen"
            name="momentDate"
            value={values.momentDate}
            onChange={onChange}
            // isInvalid={errors.momentDate !== "" && !!errors.momentDate}
          />
          {/* <Form.Control.Feedback type="invalid">{errors.momentDate}</Form.Control.Feedback> */}
        </Form.Group>
        <Form.Group controlId="formBasicLocation">
          <Form.Label>Moment Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Where Did It Happen"
            name="location"
            value={values.location}
            onChange={onChange}
            // isInvalid={errors.location !== "" && !!errors.location}
          />
          {/* <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback> */}
        </Form.Group>

        <Button variant="primary" type="submit">
          Immortalize
        </Button>
      </Form>
    </Container>
  )
}

export default MomentForm
