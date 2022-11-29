import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteProduct from "./DeleteProduct/DeleteProduct";

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
        <h2 className="page-header__title">Product</h2>
        <div className="page-header__add">
          <i className="bx bx-plus"></i>
          <div>Add New</div>
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
                        <div className="card__body__features">
                          <span className="card__body__features__edit">
                            <DeleteProduct
                              item={item.id}
                              parentCallback={callbackFunction}
                            ></DeleteProduct>
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
