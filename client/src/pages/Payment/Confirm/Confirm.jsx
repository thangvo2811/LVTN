import { Input, Radio, Space } from "antd";
import Link from "antd/lib/typography/Link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FormInput from "../../../components/FormInput";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import numberWithCommas from "../../../utils/numberWithCommas";

const Confirm = () => {
  const [allCity, setAllCity] = useState([]);
  const [allDistrict, setAllDistrict] = useState([]);
  const [cityById, setCityById] = useState("");
  const [districtById, setDistrictById] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const newCustomer = localStorage.getItem("User");

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

  const callCreateOrder = async () => {
    await axios
      .post("http://localhost:8000/api/create-order-user/", {
        fullname: name,
        email: email,
        Address: address,
        phonenumber: phone,
        voucher_id: "",
        method_id: 1,
        cus_id: newCustomer,
        warehouse_id: 1,
        cartitem: [4, 5, 6],
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllCity();
    callAllDistrict(cityById);
  }, [cityById, newCustomer]);

  const inputs = [
    {
      key: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email không hợp lệ",
      label: "Email",
      pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$",
      required: true,
    },
    {
      key: 2,
      name: "username",
      type: "text",
      placeholder: "Họ tên",
      errorMessage: "Họ tên không được trống",
      label: "Họ tên",
      pattern: null,
      required: true,
    },
    {
      key: 3,
      name: "phone",
      type: "text",
      placeholder: "Phone",
      errorMessage: "Phone phải có ít nhất 10 số",
      label: "Phone",
      pattern: "[0-9]{10}",
      required: true,
    },
    {
      key: 4,
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
                onChange={(e) => setEmail(e.target.value)}
              ></FormInput>
              <FormInput
                {...inputs[1]}
                onChange={(e) => setName(e.target.value)}
              ></FormInput>
              <FormInput
                {...inputs[2]}
                onChange={(e) => setPhone(e.target.value)}
              ></FormInput>
              {/* <label>Thành Phố</label>
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
              </select> */}
              <FormInput
                {...inputs[3]}
                onChange={(e) => setAddress(e.target.value)}
              ></FormInput>
              <div className="btn-info">
                <button type="submit" className="btn-click">
                  Tiếp Tục
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Confirm;
