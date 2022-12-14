import React from "react";
import AddComment from "../pages/Comment/AddComment";
import numberWithCommas from "../utils/numberWithCommas";

const Orderitem = (props) => {
  const orderItem = props.orderItem;
  const statusOrder = props.status;
  return (
    <div className="order-content">
      <div className="order-title">
        <div className="order-name">Trạng Thái:</div>
        <div className="order-status">CHƯA XÁC NHẬN</div>
      </div>
      <div className="order-item">
        <div className="order-item__image">
          <img src={orderItem.img} alt="" />
          <div className="order-item__info">
            <div className="order-item__info__title"></div>
            <div className="order-item__info__id">
              Tên sản phẩm: {orderItem.name}
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
        <AddComment img={orderItem.img} idProduct={orderItem.id}></AddComment>

        {/* <button className="btn-click">HỦY ĐƠN HÀNG</button> */}
      </div>
    </div>
  );
};

export default Orderitem;
