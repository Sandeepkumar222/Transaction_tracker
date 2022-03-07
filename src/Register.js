import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";

const Register = (props) => {
  const [warn, setWarn] = useState(false);
  const [warning, setWarning] = useState(null);

  /// function for validating the data

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 3) {
      errors.name = "Must be atleast 4 characters ";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.name.length < 5) {
      errors.name = "Must be atleast 6 characters ";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);

      const handleAdd = async (values) => {
        try {
          const res = await axios({
            method: "post",
            url: "/auth/register/",
            headers: { "Content-Type": "application/json" },
            data: {
              email: values.email,
              name: values.name,
              password: values.password,
            },
          });
          console.log(res.data);
          props.ChangeRegister(false);
          let data = res.data;
          return data;
        } catch (error) {
          setWarning(error.response.data.error);
          console.log(error.response.data.error);
          setWarn(true);
          console.log(warn, warning);
          return warning;
        }
      };
      handleAdd(values);
    },
  });

  return (
    <>
      <br></br>
      <Container>
        <Col>
          <Row>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />

                {formik.touched.name && formik.errors.name ? (
                  <div className="errors text-danger">{formik.errors.name}</div>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your mail id"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />

                {formik.touched.email && formik.errors.email ? (
                  <div className="errors text-danger">
                    {formik.errors.email}
                  </div>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="errors text-danger">
                    {formik.errors.password}
                  </div>
                ) : null}
              </Form.Group>
              {warn ? <h5 className="errors text-danger"> {warning}</h5> : null}

              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
            <Col xs={1} md={4}>
              <Button
                variant="danger"
                onClick={() => props.ChangeRegister(false)}
              >
                cancel
              </Button>
            </Col>
          </Row>
        </Col>
      </Container>
      <br></br>{" "}
    </>
  );
};

export default Register;
