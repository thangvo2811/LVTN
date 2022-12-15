import React from "react";

import AddComment from "../pages/Comment/AddComment";
import DeleleOrder from "../pages/UserProfile/OrderList/DeleleOrder";
import numberWithCommas from "../utils/numberWithCommas";

const orderStatus = [
  {
    id: 1,
    name: "Đơn hàng đang chờ xác nhận",
  },
  {
    id: 2,
    name: "Đơn hàng đang được chuẩn bị",
  },
  {
    id: 3,
    name: "Đơn hàng đang được giao",
  },
  {
    id: 4,
    name: "Đơn hàng giao thành công",
  },
  {
    id: 5,
    name: "Đơn hàng đã bị hủy",
  },
];
const Orderitem = (props) => {
  const orderItem = props.orderItem;
  const statusOrder = props.status;

  return (
    <div className="order-content">
      <div className="order-title">
        <div className="order-name">Trạng Thái:</div>
        {orderStatus?.map((item, index) => (
          <div className="order-status">
            {item.id === props.statusOrder ? item.name : null}
          </div>
        ))}
      </div>
      <div className="order-item">
        <div className="order-item__image">
          <img src={orderItem.img} alt="" />
          <div className="order-item__info">
            <div className="order-item__info__title"></div>
            <div className="order-item__info__id">
              Tên sản phẩm: {orderItem.Orderitem.name}
            </div>
            <div className="order-item__info__price">
              Số lượng: {orderItem.Orderitem.TotalQuantity}
            </div>
          </div>
        </div>

        <div className="order-item__total">
          <div className="order-item__total__total">
            Tổng : {numberWithCommas(orderItem.Orderitem.TotalPrice)} VND
          </div>
        </div>
      </div>
      <div className="btn-delete">
        {orderStatus?.map((item, index) => (
          <div>
            {item.id && props.statusOrder === 4 ? (
              <AddComment
                img={orderItem.img}
                idProduct={orderItem.id}
              ></AddComment>
            ) : null}
          </div>
        ))}
        {orderStatus?.map((item, index) => (
          <div>
            {(item.id === props.statusOrder) === 1 ||
            (item.id === props.statusOrder) === 2 ? (
              <DeleleOrder></DeleleOrder>
            ) : null}
          </div>
        ))}

        <DeleleOrder></DeleleOrder>
        {/* <button className="btn-click">HỦY ĐƠN HÀNG</button> */}
      </div>
    </div>
  );
};

export default Orderitem;
