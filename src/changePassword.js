import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";

const ChangePassword = () => {
  const history = useHistory();

  const match = useRouteMatch();

  localStorage.setItem("token", match.params.token);
  console.log(match.params.token);

  // to show/hide update portion/component

  const [warn, setWarn] = useState(false);
  const [warning, setWarning] = useState(null);

  // A custom validation function. This must return an object
  // which keys are symmetrical to our values/initialValues
  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 5) {
      errors.password = "Must be 5 characters or greater";
    }

    if (!values.password2) {
      errors.password2 = "Required";
    } else if (values.password !== values.password2) {
      errors.password2 = "Re-entered password is not same";
    }

    return errors;
  };

  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      password: "",
      password2: "",
    },
    validate,
    onSubmit: (values) => {
      console.log("123");
      console.log(values);

      const handleAdd = async (values) => {
        try {
          const res = await axios({
            method: "put",
            url: `https://transaction-tracker-be.herokuapp.com/forgotPassword/${match.params.token}`,
            headers: { "Content-Type": "application/json" },
            data: {
              password: values.password,
            },
          });
          console.log(res.data);
          let data = res.data;
          history.push("/login");
          console.log(res.data);
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
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password2"
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password2}
                  />

                  {formik.touched.password2 && formik.errors.password2 ? (
                    <div className="errors text-danger">
                      {formik.errors.password2}
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

export default ChangePassword;
