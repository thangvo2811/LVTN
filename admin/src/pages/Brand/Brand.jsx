import React, { useEffect, useState } from "react";

import Table from "../../components/table/Table";
import axios from "axios";
import { useParams } from "react-router-dom";
import { message } from "antd";

const Brand = () => {
  const [allBrand, setAllBrand] = useState([]);
  const [deletebBrand, setDeleteBrand] = useState({});
  const param = useParams();

  const callAllBrand = async () => {
    await axios
      .get("http://localhost:8000/api/get-brand/")
      .then((res) => {
        console.log(res.data);
        setAllBrand(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callDeleteBrand = async (id) => {
    await axios
      .delete(`http://localhost:8000/api/delete-brand/${id}/`)
      .then((res) => {
        if (res.data.errCode === 0) {
          message.error("Xóa thành công");
          setDeleteBrand(res);
        } else if (res.data.errCode === 1) {
          message.error("Không tồn tại");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllBrand();
    callDeleteBrand();
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
                    <td>Settings</td>
                  </tr>
                </thead>
                <thead>
                  {allBrand?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
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

export default Brand;
