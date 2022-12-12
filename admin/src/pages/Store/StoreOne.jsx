import React, { useEffect, useState } from "react";
import axios from "axios";
import AddStore from "./AddStoreOne/AddStore";
import { useCallback } from "react";

const StoreOne = (props) => {
  const [allStore, setAllStore] = useState([]);
  const [reloadPage, setReloadPage] = useState("");

  const idBranch = 1;
  console.log("ID KHO 1", idBranch);

  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };

  const callAllStore = useCallback(async () => {
    await axios
      .get(`http://localhost:8000/api/Get-all-warehouse/?id=${idBranch}`)
      .then((res) => {
        setAllStore(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idBranch]);
  const array = allStore.map((item, index) =>
    item.optionvalue.map((data, i) => data)
  );
  console.log("ARRAY", array);
  useEffect(() => {
    callAllStore();
  }, [callAllStore, reloadPage]);
  return (
    <div>
      <div className="page-header">
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
                    <td>Tên Kho</td>
                    <td>Số Lượng</td>
                    <td>Thuộc Tính</td>
                  </tr>
                </thead>
                <thead>
                  {allStore
                    ?.sort((a, b) => a.id - b.id)
                    .map((item, index) => (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.product_id}</td>
                        <td>{item.UserwarehouseProduct.name}</td>
                        <td>{item.quantity}</td>
                        <td className="option-value">
                          {item.optionvalue.map((data, i) => (
                            <td>{data}</td>
                          ))}
                        </td>
                        {/* <td>{item.optionvalue.map((data, i) => data)}</td> */}
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

export default StoreOne;
