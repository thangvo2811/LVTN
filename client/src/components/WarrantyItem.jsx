import React from "react";

const WarrantyItem = (props) => {
  const warrantyItem = props.item;
  const date = warrantyItem.expire;
  const dateWarranty = date.split("T17:00:00.000Z");
  return (
    <div className="order-content">
      <div className="order-item">
        <div className="order-item__image">
          <div className="order-item__info">
            <div className="order-item__info__title">
              {warrantyItem.infor} Của Mã Đơn: {warrantyItem.code}
            </div>
            <div className="order-item__info__id">
              Ngày Hết Hạn: {dateWarranty}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantyItem;
