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
  // const [selectStatusOrder, setSelectStatusOrder] = useState([]);
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

  // const callOrderByStatus = useCallback(async () => {
  //   await axios
  //     .post(`${process.env.REACT_APP_API_URL}/api/get-order-by-user-status/`, {
  //       cus_id: idCus,
  //       status: selectStatusOrder,
  //     })
  //     .then((res) => {
  //       setAllOrder(res.data.findOrder);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [idCus, selectStatusOrder]);

  useEffect(() => {
    callAllOrder();
  }, [callAllOrder, idCus, reloadPage]);
  // useEffect(() => {
  //   callOrderByStatus();
  // }, [callOrderByStatus]);
  return (
    <>
      <SectionTitle>Danh Sách Đơn Hàng</SectionTitle>
      {/* <select onChange={(e) => setSelectStatusOrder(e.target.value)}>
        <option>Chọn Trạng Thái</option>
        {allOrder?.map((item, index) => (
          <option
            setSelectStatusOrder={index === 0 ? null : null}
            key={index}
            value={item?.status}
          >
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
