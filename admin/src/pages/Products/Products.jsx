import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [allProduct, setAllProduct] = useState([]);
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
  }, []);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Brand</h2>
        <button> ADD NEW</button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>unitPrice</td>
                    <td>CurrentQuantity</td>
                    <td>IntialQuantity</td>
                    <td>Description</td>
                    <td>Status</td>
                    <td>Brand_id</td>
                    <td>Category_id</td>
                    <td>Img</td>
                    <td>Settings</td>
                  </tr>
                </thead>
                <thead>
                  {allProduct?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.unitprice}</td>
                      <td>{item.currentQuantity}</td>
                      <td>{item.IntialQuantity}</td>
                      <td>{item.Description}</td>
                      <td>{item.status}</td>
                      <td>{item.brand_id}</td>
                      <td>{item.category_id}</td>
                      <td>{item.img}</td>
                      <td>
                        <span className="card__body__edit">
                          <i className="bx bxs-edit"></i>
                        </span>
                        <span className="card__body__delete">
                          <i className="bx bx-trash"></i>
                        </span>
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
