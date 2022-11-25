import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

const Categories = () => {
  const [allCategory, setAllCategory] = useState([]);
  const param = useParams();

  const callAllCategory = async () => {
    await axios
      .get("http://localhost:8000/api/get-Category/")
      .then((res) => {
        console.log(res.data);
        setAllCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callDeleteCategory = async (id, e) => {
    e.preventDefault();
    await axios
      .delete(`http://localhost:8000/api/delete-Category/${id}/`)
      .then((res) => {
        console.log(res);
        callAllCategory();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllCategory();
  }, []);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Category</h2>
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
                    <td>Description</td>
                    <td>Parent_id</td>
                    <td>Settings</td>
                  </tr>
                </thead>
                <thead>
                  {allCategory?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.parent_id}</td>
                      <td>
                        <span className="card__body__edit">
                          <i className="bx bxs-edit"></i>
                        </span>
                        <span
                          className="card__body__delete"
                          onClick={(e) => callDeleteCategory(item.id, e)}
                        >
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

export default Categories;
