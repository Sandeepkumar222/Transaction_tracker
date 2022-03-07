import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import Register from "./Register";
import { useHistory } from "react-router";

const LoginPage = () => {
  const jwt = require("jsonwebtoken");
  const history = useHistory();

  const [warn, setWarn] = useState(false);
  const [warning, setWarning] = useState(null);
  // to show/hide update portion/component
  const [reg, setReg] = useState(false);

  /// function for validating the data

  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 5) {
      errors.password = "Must be atleast 6 characters ";
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
    },
    validate,
    onSubmit: (values) => {
      console.log(values);

      const handleAdd = async (values) => {
        try {
          const res = await axios({
            method: "post",
            url: "https://transaction-tracker-be.herokuapp.com/auth/login",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              email: values.email,
              password: values.password,
            },
          });
          let data = res.data;
          localStorage.setItem("token", res.data.token);
          const userid = jwt.verify(
            res.data.token,
            "ExpenseManagerApplication"
          );
          console.log("verifoed");
          localStorage.setItem("id", userid.userid);
          history.push("/home");

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
      <h3 className="title">Transactions tracker</h3>
      <Container className="quote">
        Transactions Tracker helps to track your daily expensed and income data
      </Container>
      <div className="login">
        <br></br>
        {reg ? (
          <Register
            ChangeRegister={(reg) => {
              setReg(reg);
            }}
          />
        ) : (
          <Container>
            <Col>
              <Row>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
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

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
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
                  <a
                    onClick={() => {
                      history.push("/forgotPassword");
                    }}
                  >
                    <p className="forgotPassword">forgot password?</p>
                  </a>
                  {warn ? (
                    <h5 className="errors text-danger"> {warning}</h5>
                  ) : null}
                  <br />
                  <Button
                    className="btn btn-primary"
                    type="submit"
                    onclick="href='/home'"
                  >
                    Log in
                  </Button>

                  <Button
                    variant="primary"
                    onClick={() => {
                      setReg(true);
                    }}
                  >
                    Register
                  </Button>
                </Form>
              </Row>
            </Col>
          </Container>
        )}
        <br></br>{" "}
      </div>
    </>
  );
};

export default LoginPage;
