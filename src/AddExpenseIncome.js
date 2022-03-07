import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useFormik } from "formik";
import { Table, Button, Container, Form, Modal } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./header";
import ReactLoading from "react-loading";

const AddExpenseIncome = () => {
  // to show/hide update portion/component
  const [update, setUpdate] = useState(false);

  const [balance, setBal] = useState(0);
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedTask, setSelectedTask] = useState();
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    getData();
    console.log("data");
  }, []);

  function sortFunction(a, b) {
    var c = new Date(a.date);
    var d = new Date(b.date);
    return c - d;
  }
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
      console.log(data);
      if (data.transactions) {
        await localStorage.setItem(
          "transaction",
          JSON.stringify(data.transactions)
        );
        setPosts(data.transactions);
        walletBal(data.transactions);
        return data.transactions;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.expense) {
      errors.expense = "Required";
    } else if (values.expense.length > 11) {
      errors.expense = "Must be 10 characters or less";
    }
    if (!values.amount) {
      errors.amount = "Required";
    }
    if (!values.comment) {
      errors.comment = "Describe a bit for future reference";
    } else if (values.comment.length < 10) {
      errors.comment = "Describe a bit more for easy recitation";
    }
    return errors;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      expense: selectedTask ? selectedTask.expense : "",
      amount: selectedTask ? +selectedTask.amount : null,
      comment: selectedTask ? selectedTask.comment : "",
      type: selectedTask ? selectedTask.type : "expense",
      date: selectedTask ? selectedTask.date : startDate,
    },
    validate,
    onSubmit: (values) => {
      console.log(values);

      const handleAdd = async () => {
        if (values.type === "expense") {
          values.amount = -values.amount;
        }
        let addTransaction = {
          expense: values.expense,
          amount: values.amount,
          comment: values.comment,
          date: values.date,
          type: values.type,
          createdAt: new Date(),
        };
        let postsAdd = posts;
        postsAdd[postsAdd.length] = addTransaction;
        postsAdd.sort(sortFunction);
        await putData(postsAdd);
        values.expense = "";
        values.amount = "";
        values.comment = "";
        setUpdate(!update);
      };
      handleAdd();
    },
  });

  let putData = async (postsAdd) => {
    try {
      let data = await axios({
        method: "put",
        url: `https://transaction-tracker-be.herokuapp.com/api/users/${localStorage.getItem("id")}`,
        headers: {
          "Content-Type": "application/json",
          "access-token": "Bearer " + `${localStorage.getItem("token")}`,
        },
        data: {
          transactions: postsAdd,
        },
      });
      if (data.transactions) {
        localStorage.setItem("transaction", JSON.stringify(data.transactions));
        setPosts(data.transactions);
        return data;
      }
      setPosts(data.data.value.transactions);
      await walletBal(data.data.value.transactions);
    } catch (e) {
      console.log(e);
    }
  };

  let deletePost = (e) => {
    console.log(e);
    let delPost = posts;
    delPost = delPost.filter((ele) => ele !== e);
    console.log(delPost);
    delPost.sort(sortFunction);
    putData(delPost);
  };

  let walletBal = (resPosts) => {
    let res = 0;
    for (let i = 0; i < resPosts.length; i++) {
      res = res + resPosts[i].amount;
    }
    console.log(res);
    setBal(res);
  };

  useEffect(() => {
    graphVals();
  }, [posts]);

  let graphVals = () => {
    let dates = [];
    for (let i = 0; i < posts.length; i++) {
      dates[i] = posts[i].date.split("T").slice(0, -1);
      dates[i].push(posts[i].amount);
    }
    console.log(dates, dates.length);
    try {
      var dateIn = dates[0][0];
      let add = 0;
      let transactionDates = [];
      let AmountPerDay = [];
      if (dates.length === 1) {
        AmountPerDay.push(dates[0][1]);
        transactionDates.push(dates[0][0]);
      } else if (dates.length === 0) {
        transactionDates = [0];
        AmountPerDay = [0];
      } else {
        for (let i = 0; i < dates.length; i++) {
          if (dateIn === dates[i][0]) {
            add = add + dates[i][1];
            if (i === dates.length - 1) {
              AmountPerDay.push(add);
              transactionDates.push(dateIn);
            }
          } else {
            AmountPerDay.push(add);
            add = dates[i][1];
            transactionDates.push(dateIn);
            dateIn = dates[i][0];
            if (i === dates.length - 1) {
              AmountPerDay.push(add);
              transactionDates.push(dateIn);
            }
          }
        }
      }
      dates = { dates: transactionDates, amounts: AmountPerDay };
      localStorage.setItem("dates", JSON.stringify(dates));
    } catch (e) {
      console.log(e);
    }
    console.log(dates);
  };

  return (
    <>
      <Header />
      <br />
      <Container className="justify-ceneter sm">
        {update ? (
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Type of Transaction</Form.Label>
              <Form.Control
                name="type"
                as="select"
                custom
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Transaction</Form.Label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </Form.Group>
            {formik.touched.amount && formik.errors.amount ? (
              <div className="errors text-danger">{formik.errors.amount}</div>
            ) : null}
            <Form.Group className="mb-3">
              <Form.Label>Title of Transaction</Form.Label>
              <Form.Control
                type="text"
                name="expense"
                placeholder="Enter title of Transaction"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.expense}
              />
            </Form.Group>
            {formik.touched.expense && formik.errors.expense ? (
              <div className="errors text-danger">{formik.errors.expense}</div>
            ) : null}
            <Form.Group className="mb-3">
              <Form.Label>Transaction Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                placeholder="Enter amount in INR"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
              />
            </Form.Group>
            {formik.touched.amount && formik.errors.amount ? (
              <div className="errors text-danger">{formik.errors.amount}</div>
            ) : null}

            <Form.Group className="mb-3">
              <Form.Label>Comment on Transaction</Form.Label>
              <Form.Control
                type="text"
                name="comment"
                placeholder="Enter any comment on transaction"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.comment}
              />
              {formik.touched.comment && formik.errors.comment ? (
                <div className="errors text-danger">
                  {formik.errors.comment}
                </div>
              ) : null}
            </Form.Group>
            <Button variant="primary" type="submit">
              Add expenditure
            </Button>
          </Form>
        ) : (
          <Button
            onClick={() => {
              setUpdate(!update);
            }}
          >
            Add Transaction
          </Button>
        )}
      </Container>
      <br></br>
      <Container className="justify-ceneter sm">
        <Button className="float-end">
          <i
            className="fas fa-wallet"
            style={{ fontsize: "78px", color: "white" }}
          >
            {" "}
            Rs.{balance}
          </i>
        </Button>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Date of transaction</th>
              <th>Transaction title</th>
              <th>Amount in INR</th>
              <th>Comment</th>
              <th>type of Transaction</th>
              <th>Delete transaction</th>
            </tr>
          </thead>
          {posts ? (
            <tbody>
              {posts.map((e) => {
                return (
                  <>
                    <tr key={e.createdAt}>
                      <td>{e.date.split("T").join(" ")}</td>
                      <td>{e.expense}</td>
                      <td>{e.amount}</td>
                      <td>{e.comment}</td>
                      <td>{e.type}</td>

                      <td>
                        <Button variant="danger" onClick={() => deletePost(e)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          ) : (
            <ReactLoading
              type={"bars"}
              color={"blue"}
              height={"20%"}
              width={"20%"}
            />
          )}
        </Table>
      </Container>
    </>
  );
};

export default AddExpenseIncome;
