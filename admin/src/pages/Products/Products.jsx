import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteProduct from "./DeleteProduct/DeleteProduct";
import AddProduct from "./AddProduct/AddProduct";
import "./style.scss";
import UploadProduct from "./UpdateProduct/UploadProduct";

const Products = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };

  const callAllProduct = async () => {
    await axios
      .get("http://localhost:8000/api/get-all-product?brand_id=&category_id=")
      .then((res) => {
        console.log(res.data.products);
        setAllProduct(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllProduct();
  }, [reloadPage]);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Sản Phẩm</h2>
        <div>
          <AddProduct parentCallback={callbackFunction}></AddProduct>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Tên Sản Phẩm</td>
                    <td>Hình Ảnh</td>
                    <td>Giá</td>
                    <td>Số Lượng Hiện Tại</td>
                    <td>Số Lượng Ban Đầu</td>
                    <td>Mô Tả</td>
                    <td>Mã Danh Mục</td>
                    <td>Mã Thương Hiệu</td>
                    <td>Tình Trạng</td>
                    <td>Cài Đặt</td>
                  </tr>
                </thead>
                <thead>
                  {allProduct
                    ?.sort((a, b) => a.id - b.id)
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>
                          <div className="word-wrap">{item.name}</div>
                        </td>
                        <td>
                          <img
                            className="product-img"
                            src={item.img ? item.img : item.name}
                          />
                        </td>
                        <td>{item.unitprice}</td>
                        <td>{item.currentQuantity}</td>
                        <td>{item.IntialQuantity}</td>
                        <td>
                          <div className="word-wrap">{item.Description}</div>
                        </td>
                        <td>{item.category_id}</td>
                        <td>{item.brand_id}</td>
                        <td>{item.status}</td>
                        <td>
                          <div className="card__body__features">
                            <span className="card__body__features__edit">
                              <UploadProduct
                                id={item.id}
                                nameProduct={item.name}
                                idCate={item.category_id}
                                idBrand={item.brand_id}
                                price={item.unitprice}
                                imgProduct={item.img}
                                descProduct={item.Description}
                                parentCallback={callbackFunction}
                              ></UploadProduct>
                            </span>
                            <span className="card__body__features__delete">
                              <DeleteProduct
                                item={item.id}
                                parentCallback={callbackFunction}
                              ></DeleteProduct>
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

export default Products;
