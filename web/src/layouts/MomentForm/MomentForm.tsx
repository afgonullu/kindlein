import React from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"

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
  //TODO: transition. transition libraries
  //TODO: errors, error views
  return (
    <Container className="kl-form-container">
      <Form noValidate onSubmit={onSubmit} className="kl-card kl-form">
        <Form.Group controlId="formBasicTitle" className="kl-form-group">
          {/* <Form.Label>Moment Title</Form.Label> */}
          <Form.Control
            type="text"
            placeholder="Give A Title"
            name="title"
            value={values.title}
            onChange={onChange}
            className="kl-form-control"
            // isInvalid={errors.title !== "" && !!errors.title}
          />
          {/* <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback> */}
        </Form.Group>
        <Form.Group controlId="formBasicBody" className="kl-form-group">
          {/* <Form.Label>Moment Body</Form.Label> */}
          <Form.Control
            as="textarea"
            placeholder="What happened?"
            name="body"
            value={values.body}
            onChange={onChange}
            className="kl-form-control"
            // isInvalid={errors.body !== "" && !!errors.body}
          />
          {/* <Form.Control.Feedback type="invalid">{errors.body}</Form.Control.Feedback> */}
        </Form.Group>
        <Row>
          <Col>
            <Form.Group controlId="formBasicDate" className="kl-form-group">
              {/* <Form.Label>Moment Date</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Date"
                name="momentDate"
                value={values.momentDate}
                onChange={onChange}
                className="kl-form-control"
                // isInvalid={errors.momentDate !== "" && !!errors.momentDate}
              />
              {/* <Form.Control.Feedback type="invalid">{errors.momentDate}</Form.Control.Feedback> */}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicLocation" className="kl-form-group">
              {/* <Form.Label>Moment Location</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Place"
                name="location"
                value={values.location}
                onChange={onChange}
                className="kl-form-control"
                // isInvalid={errors.location !== "" && !!errors.location}
              />
              {/* <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback> */}
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="kl-form-button">
          Save The Moment
        </Button>
      </Form>
    </Container>
  )
}

export default MomentForm
