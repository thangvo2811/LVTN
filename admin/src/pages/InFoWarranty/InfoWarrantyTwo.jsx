import React, { useEffect, useState } from "react";
import axios from "axios";
import AddWarrantyTwo from "./AddWarrantyTwo/AddWarrantyTwo";
import UpdateWarrantyTwo from "./UpdateWarrantyTwo/UpdateWarrantyTwo";

const InfoWarrantyTwo = () => {
  const [infoWarranty, setInfoWarranty] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };

  const callInfoWarranty = async () => {
    await axios
      .get(`http://localhost:8000/api/get-all-warranty/${2}/`)
      .then((res) => {
        setInfoWarranty(res.data.Warranty);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callInfoWarranty();
  }, [reloadPage]);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Thông Tin Bảo Hành</h2>
        <AddWarrantyTwo parentCallback={callbackFunction}></AddWarrantyTwo>
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
                    <td>Thông Tin</td>
                    <td>Mô Tả</td>
                    <td>Số Máy</td>
                  </tr>
                </thead>
                <thead>
                  {infoWarranty?.map((item, index) => (
                    <tr>
                      <td>{item?.id}</td>
                      <td>{item?.name}</td>
                      <td>{item?.infor}</td>
                      <td>{item?.description}</td>
                      <td>{item?.serinumber}</td>
                      <td>
                        <div className="card__body__features">
                          <span className="card__body__features__edit">
                            <UpdateWarrantyTwo
                              item={item}
                              parentCallback={callbackFunction}
                            ></UpdateWarrantyTwo>
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

export default InfoWarrantyTwo;
