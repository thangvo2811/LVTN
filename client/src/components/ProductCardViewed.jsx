import React from "react";
import { useNavigate } from "react-router-dom";
import numberWithCommas from "../utils/numberWithCommas";
import pd from "../assets/images/products/laptop-asus-rog-strix-g15-g513ih-hn015t-1.jpg";
import { message } from "antd";
import axios from "axios";
const ProductCardViewed = (props) => {
  const idCus = localStorage.getItem("User");
  const product = props.product;
  console.log(product.id);
  const navigate = useNavigate();
  const handleAddListProduct = async () => {
    await axios
      .post("http://localhost:8000/api/add-too-wish-list/", {
        cus_id: idCus,
        product_id: product.ViewProduct.id,
      })
      .then((res) => {
        if (res.data.errCode === 3) {
          message.error("Đã Có Trong Danh Sách Yêu Thích");
          return;
        }
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Đã Thêm Vào Danh Sách Yêu Thích");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="product-card-view">
        <div className="product-card-view__image">
          <img
            src={product.ViewProduct.img}
            alt=""
            onError={(e) => {
              e.target.setAttribute("src", pd);
            }}
          />
        </div>
        <div className="product-card-view__interact">
          <div
            className="product-card-view__interact__btn"
            onClick={() => navigate("/detailproduct/" + product.product_id)}
          >
            Xem ngay
          </div>

          <div onClick={() => handleAddListProduct(idCus, product.id)}>
            <i className="bx bx-heart-circle"></i>
          </div>
        </div>
        <div className="product-card-view__info">
          <div className="product-card-view__info__title">
            {product.ViewProduct.name}
          </div>
          <div className="product-card-view__info__price">
            {numberWithCommas(product.ViewProduct.unitprice)} VNĐ
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardViewed;
