import React, { useCallback, useEffect, useState } from "react";
import numberWithCommas from "../../../utils/numberWithCommas";
import axios from "axios";
import "./style.scss";

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
      <div className="order-title">DANH SÁCH ĐƠN HÀNG</div>
      <div className="order-item__status">
        <div className="order-item__status">Đang Chuẩn Bị</div>
        {/* <button>Đánh Giá Sản Phẩm</button> */}
      </div>
      <div className="order-item">
        {allOrder?.map((item, index) =>
          item.OrderProductItem.map((data, i) => {
            return (
              <>
                <div className="order-item__image">
                  <img src={data.img} alt="" />
                  <div className="order-item__info">
                    <div className="order-item__info__title"></div>
                    <div className="order-item__info__id">
                      Tên sản phẩm: {data.name}
                    </div>

                    <div className="order-item__info__price">
                      Số Lượng: {data.Orderitem.TotalQuantity}
                    </div>
                  </div>
                </div>

                <div className="order-item__total">
                  <div className="order-item__total__total">
                    Tổng : {numberWithCommas(data.Orderitem.TotalPrice)} VND
                  </div>
                </div>
              </>
            );
          })
        )}
      </div>
    </>
  );
};

export default OrderList;
