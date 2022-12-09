import { Radio, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import numberWithCommas from "../../../utils/numberWithCommas";
import "./style.scss";

const PaymentDetail = () => {
  const newCustomer = localStorage.getItem("User");
  const [cartItem, setCartItem] = useState([]);
  const [payment, setPayMent] = useState({});
  const [value, setValue] = useState(1);
  const callCartItem = async () => {
    await axios
      .get(`http://localhost:8000/api/get-cart-by-customer-id/${newCustomer}/`)
      .then((res) => {
        console.log(res.data.cartitem);
        setCartItem(res.data.cartitem);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callCartItem();
  }, [newCustomer]);
  const callPayMent = async () => {
    await axios
      .post("http://localhost:8000/api/get-momo-payment-link/", {
        orderId: 3,
      })
      .then((res) => {
        if (res && res.status === 200) {
          setPayMent(res?.data?.data.qrCodeUrl);
          console.log(res?.data?.data.qrCodeUrl);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="payment">
      <div className="payment__desc">
        <div className="payment__desc__title">Chi Tiết Đơn hàng</div>
        <div className="payment__desc__product">
          <div className="payment__desc__product__name1">Tên Sản Phẩm</div>
          <div className="payment__desc__product__name1">Giá</div>
        </div>
        {cartItem?.map((item, index) => (
          <div className="payment__desc__product">
            <div className="payment__desc__product__name">
              {item.name}
              <div className="payment__desc__product__price">
                Số lượng: {item.amount}
              </div>
            </div>

            <div className="payment__desc__product__price">
              {numberWithCommas(item.ttprice)} VNĐ
            </div>
          </div>
        ))}

        <div className="payment__desc__method">
          <div className="payment__desc__method__name">
            Phương Thức Thanh Toán
          </div>
          <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
            <Space direction="vertical">
              <Radio value={1} className="rdi">
                {" "}
                Thanh Toán MoMo
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </div>
      <div className="payment__card">
        <button className="btn-pay">Thanh Toán</button>
      </div>
    </div>
  );
};

export default PaymentDetail;
