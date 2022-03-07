import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import AvatarEditor from "react-avatar-editorz";
import { Button, Form } from "react-bootstrap";
import Header from "./header";

const About = () => {
  const [pic, setPic] = useState(
    "https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png"
  );

  // to store the data retrieved from api
  const [userData, setUserData] = useState({});

  // to show/hide update portion/component
  const [update, setUpdate] = useState(true);

  // To initially get the values from api
  useEffect(async () => {
    await getData();
  }, []);

  let getData = async () => {
    try {
      let { data } = await axios({
        method: "get",
        url: `https://transaction-tracker-be.herokuapp.com/api/users/${localStorage.getItem("id")}`,
        headers: {
          "Content-Type": "application/json",
          "access-token": "Bearer " + `${localStorage.getItem("token")}`,
        },
      });
      setUserData(data);
      setPic(data.proPic);
      console.log(data);
      if (data.userStats) {
        localStorage.setItem("data", JSON.stringify(data.value.userStats));
      }
    } catch (e) {
      console.log(e);
    }
  };

  // function to convert image into base64 string II

  const changePic = async (e) => {
    const file = e.target.files[0];
    const Base64 = await converToBase(file);
    setPic(Base64);
  };

  const converToBase = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  /// function to upload data of the user

  const handleUpload = async () => {
    console.log(pic);
    const { data } = await axios({
      method: "put",
      url: `https://transaction-tracker-be.herokuapp.com/api/users/${localStorage.getItem("id")}`,
      headers: {
        "Content-Type": "application/json",
        "access-token": "Bearer " + `${localStorage.getItem("token")}`,
      },
      data: {
        proPic: pic,
      },
    });
    setUserData(data.value);
  };

  /// function for validating the data

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 3) {
      errors.name = "Must be atleast 4 characters ";
    }
    if (!values.age) {
      errors.age = "Required";
    } else if (values.age <= 0) {
      errors.age = "Must be greater than 0";
    }
    if (!values.weight) {
      errors.weight = "Required";
    } else if (values.weight <= 0) {
      errors.weight = "Must be greater than 0";
    }
    if (!values.mail) {
      errors.mail = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail)) {
      errors.mail = "Invalid email address";
    }
    if (!values.height) {
      errors.height = "Required";
    } else if (values.height <= 0) {
      errors.height = "Must be greater than 0";
    }
    if (!values.gender) {
      errors.gender = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userData ? userData.name : "",
      age: userData ? userData.age : "",
      weight: userData ? userData.weight : "",
      gender: userData ? userData.gender : "",
      height: userData ? userData.height : "",
      mail: userData ? userData.mail : "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);

      const handleAdd = async (values) => {
        const { data } = await axios({
          method: "put",
          url: `https://transaction-tracker-be.herokuapp.com/api/users/${localStorage.getItem("id")}`,
          headers: {
            "Content-Type": "application/json",
            "access-token": "Bearer " + `${localStorage.getItem("token")}`,
          },
          data: {
            name: values.name,
            age: values.age,
            height: values.height,
            mail: values.mail,
            gender: values.gender,
            proPic: pic,
            weight: values.weight,
          },
        });
        setUserData(data.value);
        setUpdate(true);
      };
      handleAdd(values);
    },
  });

  return (
    <>
      <Header />
      <br></br>
      {update ? (
        <Col md={{ span: 4, offset: 10 }}>
          <Button
            variant="primary"
            onClick={() => {
              setUpdate(false);
            }}
          >
            edit
          </Button>{" "}
        </Col>
      ) : null}
      {update ? (
        <Container>
          <Row>
            <Col>
              <AvatarEditor
                image={userData ? userData.proPic : pic}
                width={250}
                height={250}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={1.2}
                rotate={0}
                className="align-top d-inline-block"
              />
            </Col>
            <Col>
              <Row>
                <h2 className="font-weight-bold">Details</h2>
                <p>
                  Name :
                  <span className="font-italic font-weight-bold">
                    {userData.name}{" "}
                  </span>{" "}
                </p>
                <p>
                  Age :
                  <span className="font-italic font-weight-bold">
                    {userData.age + " years"}{" "}
                  </span>{" "}
                </p>
                <p>
                  Weight :
                  <span className="font-italic font-weight-bold">
                    {userData.weight + " Kgs"}{" "}
                  </span>{" "}
                </p>
                <p>
                  Height :
                  <span className="font-italic font-weight-bold">
                    {userData.height + " cms"}{" "}
                  </span>{" "}
                </p>
                <p>
                  Gender :
                  <span className="font-italic font-weight-bold">
                    {userData.gender}{" "}
                  </span>{" "}
                </p>
                <p>
                  E-mail :
                  <span className="font-italic font-weight-bold">
                    {userData.mail}{" "}
                  </span>{" "}
                </p>
              </Row>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <br></br>
          <Container>
            <Row>
              <Col>
                <AvatarEditor
                  image={userData ? userData.proPic : pic}
                  width={250}
                  height={250}
                  border={50}
                  color={[255, 255, 255, 0.6]} // RGBA
                  scale={1.2}
                  rotate={0}
                  className="align-top d-inline-block"
                />

                <input type="file" onChange={(e) => changePic(e)} />
                <button onClick={handleUpload}>Upload</button>
              </Col>
              <Col>
                <Row>
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder={"Enter your name"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />

                      {formik.touched.name && formik.errors.name ? (
                        <div className="errors text-danger">
                          {formik.errors.name}
                        </div>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="mail"
                        name="mail"
                        placeholder={"Enter mail ID"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mail}
                      />
                      {formik.touched.mail && formik.errors.mail ? (
                        <div className="errors text-danger">
                          {formik.errors.mail}
                        </div>
                      ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        name="age"
                        placeholder={"Enter your Age in years"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.age}
                      />
                      {formik.touched.age && formik.errors.age ? (
                        <div className="errors text-danger">
                          {formik.errors.age}
                        </div>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Weight</Form.Label>
                      <Form.Control
                        type="number"
                        name="weight"
                        placeholder={"Enter your weight in Kgs"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.weight}
                      />
                      {formik.touched.weight && formik.errors.weight ? (
                        <div className="errors text-danger">
                          {formik.errors.weight}
                        </div>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Height</Form.Label>
                      <Form.Control
                        type="number"
                        name="height"
                        placeholder={"Enter your height in cms"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.height}
                      />
                      {formik.touched.height && formik.errors.height ? (
                        <div className="errors text-danger">
                          {formik.errors.height}
                        </div>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <br />
                      <Form.Check
                        inline
                        label="Male"
                        name="gender"
                        type="radio"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value="male"
                        id="gender"
                      />
                      <Form.Check
                        inline
                        label="Female"
                        name="gender"
                        type="radio"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value="female"
                        id="gender"
                      />
                      <Form.Check
                        inline
                        label="Other"
                        name="gender"
                        type="radio"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={"other"}
                        id="gender"
                      />

                      {formik.touched.gender && formik.errors.gender ? (
                        <div className="errors text-danger">
                          {formik.errors.gender}
                        </div>
                      ) : null}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                  <Col xs={1} md={4}>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setUpdate(true);
                      }}
                    >
                      cancel
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <br></br>{" "}
        </>
      )}
    </>
  );
};

export default About;
