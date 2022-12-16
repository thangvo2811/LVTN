import React, { useCallback, useEffect, useState } from "react";
import numberWithCommas from "../../../utils/numberWithCommas";
import axios from "axios";
import "./style.scss";
import Orderitem from "../../../components/Orderitem";
//
const OrderList = () => {
  const [allOrder, setAllOrder] = useState([]);
  const idCus = localStorage.getItem("User");

  const callAllOrder = useCallback(async () => {
    await axios
      .get(`http://localhost:8000/api/get-order-by-user/${idCus}/`)
      .then((res) => {
        console.log(res.data.findOrder);
        setAllOrder(res.data.findOrder);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idCus]);
  useEffect(() => {
    callAllOrder();
  }, [callAllOrder, idCus]);
  return (
    <>
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
