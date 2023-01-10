import React, { useCallback, useEffect, useState } from "react";
import numberWithCommas from "../../../utils/numberWithCommas";
import axios from "axios";
import "./style.scss";
import Orderitem from "../../../components/Orderitem";
import { SectionTitle } from "../../../components/Section";
//
const OrderList = () => {
  const [allOrder, setAllOrder] = useState([]);
  const idCus = localStorage.getItem("User");
  const [reloadPage, setReloadPage] = useState("");
  const [statusOrder, setStatusOrder] = useState([]);
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };

  const callAllOrder = useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-order-by-user/${idCus}/`)
      .then((res) => {
        console.log(res.data.findOrder);
        setAllOrder(res.data.findOrder);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idCus]);
  // const callOrderByStatus = async (id) => {
  //   await axios
  //     .get(
  //       `${process.env.REACT_APP_API_URL}/api/get-all-order-by-status/${id}/`
  //     )
  //     .then((res) => {
  //       setAllOrder(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  useEffect(() => {
    callAllOrder();
    // callOrderByStatus(statusOrder);
  }, [callAllOrder, idCus, reloadPage]);
  return (
    <>
      <SectionTitle>Danh Sách Đơn Hàng</SectionTitle>
      {/* <select onChange={(e) => setStatusOrder(e.target.value)}>
        <option>Trạng Thái Đơn Hàng</option>
        {allOrder?.map((item, index) => (
          <option key={index} value={item.id}>
            {item.status}
          </option>
        ))}
      </select> */}
      <div className="order">
        <div className="order__desc">
          <div className="order__desc__item">
            {allOrder?.map((item, index) =>
              item?.OrderProductItem?.map((data, i) => {
                return (
                  <Orderitem
                    orderItem={data}
                    statusOrder={item.status}
                    key={index}
                    item={item}
                    idOrderDetail={item.id}
                    parentCallback={callbackFunction}
                  ></Orderitem>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
