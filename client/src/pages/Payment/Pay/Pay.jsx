import { Input, Radio, Space } from "antd";
import Link from "antd/lib/typography/Link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FormInput from "../../../components/FormInput";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const Pay = () => {
  const [allCity, setAllCity] = useState([]);
  const [allDistrict, setAllDistrict] = useState([]);
  const [cityById, setCityById] = useState("");
  const [districtById, setDistrictById] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState(1);

  const [payment, setPayMent] = useState({});

  const newCustomer = localStorage.getItem("User");
  const navigate = useNavigate();
  const callAllCity = async (id) => {
    await axios
      .get("https://vapi.vnappmob.com/api/province/")
      .then((res) => {
        console.log(res.data.results);
        setAllCity(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callAllDistrict = async (id) => {
    await axios
      .get(`https://vapi.vnappmob.com//api/province/district/${id}`)
      .then((res) => {
        console.log(res.data.results);
        setAllDistrict(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const callCartItem = async () => {
  //   await axios
  //     .get(`http://localhost:8000/api/get-cart-by-customer-id/${newCustomer}/`)
  //     .then((res) => {
  //       console.log(res.data.cartitem);
  //       setCartItem(res.data.cartitem);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const callCreateOrder = async () => {
    await axios.post("http://localhost:8000/api/create-order-user/", {
      fullname: name,
      email: "anhdansgvn@gmail.com",
      Address: address,
      phonenumber: phone,
      voucher_id: "",
      method_id: 1,
      cus_id: newCustomer,
      warehouse_id: 1,
      cartitem: [6],
    });
  };
  const callPayMent = async () => {
    await axios
      .post("http://localhost:8000/api/get-momo-payment-link/", {
        orderId: 1,
      })
      .then((res) => {
        setPayMent(res.data.qrCodeUrl);
        // navigate(
        //   "https://test-payment.momo.vn/v2/gateway/pay?t=TU9NT3xNT01PMTY3MDQwMDI5MDc1Mg=="
        // );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllCity();
    callAllDistrict(cityById);
  }, [cityById]);
  const handleClick = () => {
    callPayMent();
  };
  const inputs = [
    {
      key: 1,
      name: "username",
      type: "text",
      placeholder: "Họ tên",
      errorMessage: "Họ tên không được trống",
      label: "Họ tên",
      pattern: null,
      required: true,
    },
    {
      key: 2,
      name: "phone",
      type: "text",
      placeholder: "Phone",
      errorMessage: "Phone phải có ít nhất 10 số",
      label: "Phone",
      pattern: "[0-9]{10}",
      required: true,
    },
    {
      key: 3,
      name: "address",
      type: "text",
      placeholder: "Địa chỉ",
      errorMessage: "Địa chỉ không được trống",
      label: "Đỉa chỉ",
      pattern: null,
      required: true,
    },
  ];
  return (
    <div className="payment">
      <form>
        <div className="payment__content">
          <div className="payment__content__form">
            <div className="form-input">
              <FormInput
                {...inputs[0]}
                onChange={(e) => setName(e.target.value)}
              ></FormInput>
              <FormInput
                {...inputs[1]}
                onChange={(e) => setPhone(e.target.value)}
              ></FormInput>
              <label>Thành Phố</label>
              <select onChange={(e) => setCityById(e.target.value)}>
                <option>Chọn Thành Phố/ Tỉnh</option>
                {allCity?.map((item, index) => (
                  <option key={index} value={item.province_id}>
                    {item.province_name}
                  </option>
                ))}
              </select>
              <label>Quận/ Huyện</label>
              <select onChange={(e) => setDistrictById(e.target.value)}>
                <option>Chọn Quận/ Huyện</option>
                {allDistrict?.map((item, index) => (
                  <option key={index} value={item.district_id}>
                    {item.district_id ? item.district_name : ""}
                  </option>
                ))}
              </select>
              <FormInput
                {...inputs[2]}
                onChange={(e) => setAddress(e.target.value)}
              ></FormInput>
            </div>
          </div>
          <div className="payment__content__detail">
            <div className="payment__content__detail__desc">
              <div className="payment__content__detail__desc__title">
                Chi Tiết Đơn hàng
              </div>
              <div className="payment__content__detail__desc__product">
                <div className="payment__content__detail__desc__product__name">
                  Tên Sản Phẩm
                </div>
                <div className="payment__content__detail__desc__product__price">
                  Tổng Giá
                </div>
              </div>
              <div className="payment__content__detail__desc__product">
                <div className="payment__content__detail__desc__product__name">
                  Bàn Phím
                </div>
                <div className="payment__content__detail__desc__product__price">
                  200000
                </div>
              </div>
              <div className="payment__content__detail__desc__product">
                <div className="payment__content__detail__desc__product__name">
                  Shipping
                </div>
                <div className="payment__content__detail__desc__product__price">
                  200000
                </div>
              </div>

              <div className="payment__content__detail__desc__method">
                <div className="payment__content__detail__desc__method__name">
                  Phương Thức Thanh Toán
                </div>
                <Radio.Group
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                >
                  <Space direction="vertical">
                    <Radio value={1}>Thanh Toán MoMo</Radio>
                  </Space>
                </Radio.Group>
              </div>
            </div>
          </div>
        </div>
        <div className="payment__card">
          <button className="btn-pay" onClick={handleClick}>
            Thanh Toán
          </button>
        </div>
      </form>
    </div>
  );
};

export default Pay;
