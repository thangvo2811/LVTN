import React, { useCallback, useEffect, useState } from "react";
import numberWithCommas from "../../../../utils/numberWithCommas";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailOrder = () => {
  const [detailOrder, setDetailOrder] = useState();
  const param = useParams();
  const callDetailOrder = useCallback(async () => {
    await axios
      .get(`http://localhost:8000/api/get-order-detail/${param.id}/`)
      .then((res) => {
        setDetailOrder(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param.id]);
  useEffect(() => {
    callDetailOrder();
  }, [callDetailOrder]);
  return (
    <div className="detail-content">
      <div className="detail-title">Chi Tiết Đơn Hàng</div>
      {detailOrder?.listOrder.map((item, index) => (
        <>
          <div className="detail-item">
            <div className="detail-item__image">
              <img src={item.img} alt="" />
              <div className="detail-item__info">
                <div className="detail-item__info__title"></div>
                <div className="detail-item__info__id">
                  Tên sản phẩm: {item.Orderitem.name}
                </div>
                <div className="detail-item__info__price">
                  Số lượng:{item.Orderitem.TotalQuantity}
                </div>
                <div className="detail-item__info__price">
                  Giá:{numberWithCommas(item.Orderitem.price)} VNĐ
                </div>
              </div>
            </div>

            <div className="detail-item__total">
              <div className="detail-item__total__total">
                Tổng : {numberWithCommas(item.Orderitem.TotalPrice)} VNĐ
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default DetailOrder;
