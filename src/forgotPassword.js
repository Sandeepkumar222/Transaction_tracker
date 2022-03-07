import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";

const ForgotPassword = () => {
  // to show/hide update portion/component

  const [warn, setWarn] = useState(false);
  const [warning, setWarning] = useState(null);

  /// function for validating the data

  const validate = (values) => {
    const errors = {};

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
    },
    validate,
    onSubmit: (values) => {
      console.log("123");
      console.log(values);

      const handleAdd = async (values) => {
        try {
          const res = await axios({
            method: "post",
            url: "https://transaction-tracker-be.herokuapp.com/forgotPassword/emailSending",
            headers: { "Content-Type": "application/json" },
            data: {
              email: values.email,
            },
          });
          console.log(res.data);
          let data = res.data;
          console.log(res.data);
          setWarning("Email sent to your mail");
          setWarn(true);
          return data;
        } catch (error) {
          console.log(error);
          if (error.response) {
            setWarning(error.response.data.error);
            console.log(error.response.data.error);
            setWarn(true);
            console.log(warn, warning);
            return warning;
          }
        }
      };
      handleAdd(values);
    },
  });

  return (
    <>
      <h3 className="title">fitness tracker</h3>
      <p className="quote">
        Fitness Tracker helps to track your daily Calories burnt data
      </p>
      <div className="login">
        <br></br>
        <Container>
          <Col>
            <Row>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Submit your registered e-mail id to change/reset your
                    password
                  </Form.Label>
                  <Form.Control
                    type="text"
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
                {warn ? (
                  <h6 className="errors text-danger"> {warning}</h6>
                ) : null}
                <br />

                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </Form>
            </Row>
          </Col>
        </Container>
        <br></br>{" "}
      </div>
    </>
  );
};

export default ForgotPassword;
