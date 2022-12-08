import React, { useEffect, useState } from "react";
import axios from "axios";
import AddStore from "./AddStore/AddStore";

const Store = () => {
  const [allStore, setAllStore] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };

  const callAllStore = async () => {
    await axios
      .get("http://localhost:8000/api/Get-all-warehouse/")
      .then((res) => {
        setAllStore(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllStore();
  }, [reloadPage]);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Kho</h2>
        <AddStore parentCallback={callbackFunction}></AddStore>
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
                    <td>Mã Sản Phẩm</td>
                    <td>Mã Kho</td>
                    <td>Số Lượng</td>
                    <td>Thuộc Tính</td>
                  </tr>
                </thead>
                <thead>
                  {allStore?.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.product_id}</td>
                      <td>{item.warehouse_id}</td>
                      <td>{item.quantity}</td>
                      <td>{item.optionvalue}</td>
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

export default Store;
