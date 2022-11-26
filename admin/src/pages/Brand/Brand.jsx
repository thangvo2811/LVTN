import React, { useEffect, useState } from "react";

import axios from "axios";
import AddBrand from "./AddBrand/AddBrand";

import "./style.scss";
import DeleteBrand from "./DeleteBrand/DeleteBrand";
import EditBrand from "./EditBrand/EditBrand";

const Brand = () => {
  const [allBrand, setAllBrand] = useState([]);
  const data = useState(Date.now());

  const callAllBrand = async () => {
    await axios
      .get("http://localhost:8000/api/get-brand/")
      .then((res) => {
        setAllBrand(res.data.brand);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllBrand();
  }, [data]);

  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Brand</h2>
        <div>
          <AddBrand></AddBrand>
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
                    <td>Settings</td>
                  </tr>
                </thead>
                <thead>
                  {allBrand?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>
                        <div className="card__body__features">
                          <span className="card__body__features__edit">
                            {/* <i className="bx bxs-edit"></i> */}
                            {/* <DeleteBrand id={item.id} item={item}></DeleteBrand> */}
                            <EditBrand name={item.name}></EditBrand>
                          </span>
                          <span className="card__body__features__delete">
                            <DeleteBrand item={item.id}></DeleteBrand>
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

export default Brand;
