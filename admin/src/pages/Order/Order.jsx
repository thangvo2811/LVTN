import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import UpadateOrder from "./UpdateOrder/UpadateOrder";
import DeleteOrder from "./DeleteOrder/DeleteOrder";

const Order = () => {
  const [allOrder, setAllOrder] = useState([]);

  const callAllOrder = async () => {
    await axios
      .get("http://localhost:8000/api/get-all-order/")
      .then((res) => {
        setAllOrder(res.data.order);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllOrder();
  }, []);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Đơn Hàng</h2>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Email</td>
                    <td>Tên Khách Hàng</td>
                    <td>SĐT</td>
                    <td>Địa Chỉ</td>
                    <td>Tình Trạng</td>
                  </tr>
                </thead>
                <thead>
                  {allOrder?.map((item, index) => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.fullname}</td>
                      <td>{item.phonenumber}</td>
                      <td>{item.Address}</td>
                      <td>{item.status}</td>
                      <td>
                        <div className="card__body__features">
                          <span className="card__body__features__edit">
                            <UpadateOrder></UpadateOrder>
                          </span>
                          <span className="card__body__features__delete">
                            <DeleteOrder></DeleteOrder>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
