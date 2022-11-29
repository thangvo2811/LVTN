import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteCategory from "./DeleteCategory/DeleteCategory";
import UpdateCategory from "./UpdateCategory/UpdateCategory";
import AddCategory from "./AddCategory/AddCategory";

const Categories = () => {
  const [allCategory, setAllCategory] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };

  const callAllCategory = async () => {
    await axios
      .get("http://localhost:8000/api/get-Category/")
      .then((res) => {
        setAllCategory(res.data.category);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllCategory();
  }, [reloadPage]);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Category</h2>
        <div>
          <AddCategory parentCallback={callbackFunction}></AddCategory>
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
                        <div className="card__body__features">
                          <span className="card__body__features__edit">
                            <UpdateCategory
                              idcate={item.id}
                              nameCate={item.name}
                              parentIdCate={item.parent_id}
                              descCate={item.description}
                              parentCallback={callbackFunction}
                            ></UpdateCategory>
                          </span>
                          <span className="card__body__features__delete">
                            <DeleteCategory
                              item={item.id}
                              parentCallback={callbackFunction}
                            ></DeleteCategory>
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

export default Categories;
