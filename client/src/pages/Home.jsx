import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import { Form, Input, Modal, Select, Table, message, DatePicker } from "antd";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { UnorderedListOutlined, AreaChartOutlined } from "@ant-design/icons";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");

  const navigate = useNavigate();

  const handleOk = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  // Get all transaction data
  useEffect(() => {
    // Get All transactions of the user
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transaction/get-transaction", {
          userId: user._id,
          frequency,
          selectedDate,
          type,
        });

        setLoading(false);

        if (res.data.success) {
          setAllTransactions(res.data.data);
          console.log(res.data.data);
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        // message.error("Error while fetching the transactions");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type]);

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
      window.location.reload();
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
      render: (text, record) => (
        <span>{moment(text).format("DD-MM-YYYY")}</span>
      ),
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
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>

          {/* Show conditionally RangePicker  */}
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>

        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>

          {/* Show conditionally RangePicker  */}
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div className="mx-2 switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "chart" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("chart")}
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      {/* Table and charts based on the condition - i.e conditional rendering */}

      {viewData === "table" ? (
        <div className="content container mt-2">
          <Table columns={columns} dataSource={allTransactions} />
        </div>
      ) : (
        <Analytics allTransactions={allTransactions} />
      )}
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
