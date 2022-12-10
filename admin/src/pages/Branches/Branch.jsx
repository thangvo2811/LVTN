import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Branch = () => {
  const [allBranch, setAllBranch] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };
  const callAllBranch = async () => {
    await axios
      .get("http://localhost:8000/api/get-brand/")
      .then((res) => {
        setAllBranch(res.data.Warehouse);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllBranch();
  }, [reloadPage]);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Chi Nhánh</h2>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Tên</td>
                    <td>Địa Chỉ</td>
                  </tr>
                </thead>
                <thead>
                  {allBranch
                    ?.sort((a, b) => a.id - b.id)
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                          <div className="card__body__features">
                            <span className="card__body__features__edit">
                              {/* <i className="bx bxs-edit"></i> */}
                            </span>
                            <span className="card__body__features__delete"></span>
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

export default Branch;
