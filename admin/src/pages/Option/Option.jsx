import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Option = () => {
  const [allOption, setAllOption] = useState([]);
  const callAllOption = async () => {
    await axios
      .get(
        "http://localhost:8000/api/get-option-by-optionid/?option_id=&product_id="
      )
      .then((res) => {
        setAllOption(res.data.Option);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllOption();
  }, []);

  const param = useParams();
  const handleDeleteOption = async (id, e) => {
    e.preventDefault();
    await axios
      .delete(`http://localhost:8000/api/delete-option/${param.id}/`)
      .then((res) => {
        console.log(res.data.Option);
        callAllOption();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="page-header">
        <h2 className="page-header__title">Option</h2>
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
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>ProductID</td>
                    <td>OptionID</td>
                    <td>Settings</td>
                  </tr>
                </thead>
                <thead>
                  {allOption?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.product_id}</td>
                      <td>{item.option_id}</td>
                      <td>
                        <span className="card__body__edit">
                          <i className="bx bxs-edit"></i>
                        </span>
                        <span
                          className="card__body__delete"
                          onClick={(e) => handleDeleteOption(item.option_id, e)}
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

export default Option;
