import React, { useState } from "react";
import { Button, message, Steps } from "antd";

import "./style.scss";
import CheckProduct from "./CheckProduct/CheckProduct";
import Pay from "./Pay/Pay";
const steps = [
  {
    title: "Kiểm Tra Sản Phẩm",
    content: <CheckProduct />,
  },
  {
    title: "Thanh Toán",
    content: <Pay />,
  },
  {
    title: "Xác Nhận",
    content: <CheckProduct />,
  },
];
const Payment = () => {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <>
      <div className="payment">
        {" "}
        <Steps current={current} items={items} />
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Tiếp Theo
            </Button>
          )}
          {/* {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Xong
            </Button>
          )} */}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Quay Lại
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
