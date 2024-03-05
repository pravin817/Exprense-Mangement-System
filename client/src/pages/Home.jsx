import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import axios from "axios";
import Spinner from "../components/Spinner";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  // Get All transactions of the user
  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post("/transaction/get-transaction", {
        userId: user._id,
      });

      setLoading(false);

      if (res.data.success) {
        setAllTransactions(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Error while fetching the transactions");
    }
  };

  // Get all transaction data
  useEffect(() => {
    getAllTransactions();
  }, []);

  // Handle form submit
  const handleSubmit = async (values) => {
    console.log(values);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post("/transaction/add-transaction", {
        ...values,
        userId: user._id,
      });

      setLoading(false);
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }

      setShowModal(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Something went wrong!!");
    }
  };

  // Table design - antd

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
    },
  ];

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>Range Filters</div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content container mt-2">
        <Table columns={columns} dataSource={allTransactions} />
      </div>
      <Modal
        title="Add Transaction"
        open={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" placeholder="Enter Amount" />
          </Form.Item>

          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movies">Movies</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Home;
